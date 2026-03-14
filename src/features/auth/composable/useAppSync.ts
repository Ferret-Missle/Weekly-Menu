import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { myInfo, ownerInfo } from "../../../contexts/AppUserContext";
import { recipeContext } from "../../../contexts/recipesContext";
import { groupInfo } from "../../../contexts/groupContext";
import { useEffect } from "react";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../providers/firebase";
import type { AppUser, group, Recipe, WeeklyPlan } from "../../../types/types";
import { firebaseUser } from "../../../contexts/FirebaseUserContext";
import { themeMode } from "../../../contexts/themeContext";
import { dispDate } from "../../../contexts/date";
import { planContext } from "../../../contexts/plansContext";
import {
	formatLocalYYYYMMDD,
	getMonday,
} from "../../calendar/composable/showDateString";

export const useAppSync = () => {
	const user = useAtomValue(firebaseUser);
	const [me, setMe] = useAtom(myInfo);
	const [group, setGroup] = useAtom(groupInfo);
	const setOwner = useSetAtom(ownerInfo);
	const setRecipes = useSetAtom(recipeContext);
	const setTheme = useSetAtom(themeMode);

	const date = useAtomValue<Date>(dispDate); //表示期間の基準日
	const setPlan = useSetAtom(planContext);

	//ユーザ情報の取得
	useEffect(() => {
		if (!user) return; //未ログインならスキップ
		const unsubscribeMe = onSnapshot(doc(db, "users", user!.uid), (snap) => {
			if (snap.exists()) {
				setMe(snap.data() as AppUser);
				setTheme(snap.data()?.themeMode || "light");
				console.log("get my Info: ", snap.data());
			}
		});
		return () => unsubscribeMe();
	}, [user, setMe, setTheme]);

	//グループ情報の取得
	useEffect(() => {
		if (!me) return; //未ログインならスキップ
		//groupIdがなければnullをセットして終了
		if (!me!.groupId) {
			setGroup(null);
			return;
		}

		const unsubscribeGroup = onSnapshot(
			doc(db, "groups", me!.groupId),
			(snap) => {
				if (snap.exists()) {
					setGroup(snap.data() as group);
					console.log("get group Info: ", snap.data());
				}
			},
		);
		return () => unsubscribeGroup();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [me?.groupId]);

	//オーナー情報の取得
	useEffect(() => {
		if (!me) return; //未ログインならスキップ
		//自分がオーナー、グループ未参加の場合はスキップ
		if (!me!.groupId || me!.groupRole == "owner" || !group) {
			setOwner(null);
			return;
		}

		const unsubscribeOwner = onSnapshot(
			doc(db, "users", group!.ownerId),
			(snap) => {
				if (snap.exists()) setOwner(snap.data() as AppUser);
				console.log("get owner Info: ", snap.data());
			},
		);
		return () => unsubscribeOwner();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [me?.groupId, me?.groupRole, group?.ownerId]);

	//レシピ一覧の取得
	useEffect(() => {
		if (!me) return; //未ログインならスキップ

		const q = query(
			collection(db, "recipes"),
			where("authorId", "==", me!.uid),
		);
		const unsubsrcibeRecipes = onSnapshot(q, (snap) => {
			const list = snap.docs.map((d) => d.data() as Recipe);
			// const list = snap.docs.map((d) => {id:d.id,...d.data()} as Recipe);
			setRecipes(list);
			console.log("get recipes Info: ", list);
		});

		return () => {
			unsubsrcibeRecipes();
		};
	}, [me?.groupId]);

	//週間プランの取得
	useEffect(() => {
		if (!me) return;

		const monday = getMonday(date);
		const planId =
			me.displayPlan === "owner" && group && group.ownerId
				? `${group.ownerId}_${formatLocalYYYYMMDD(monday)}`
				: `${me.uid}_${formatLocalYYYYMMDD(monday)}`;
		// console.log("planId= ", planId);
		const unsubscribe = onSnapshot(doc(db, "weeklyPlans", planId), (snap) => {
			if (snap.exists()) {
				setPlan({ id: snap.id, ...snap.data() } as WeeklyPlan);
				console.log("get weekly Plans: ", snap.data());
			} else {
				setPlan(undefined);
			}
		});

		return () => unsubscribe();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [me?.displayPlan, date, group?.id, group?.ownerId]);
};
