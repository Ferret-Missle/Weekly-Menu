import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { myInfo, ownerInfo } from "../../../contexts/AppUserContext";
import { recipeContext } from "../../../contexts/recipesContext";
import { groupInfo } from "../../../contexts/groupContext";
import { useEffect } from "react";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../providers/firebase";
import type { AppUser, group, Recipe } from "../../../types/types";
import { firebaseUser } from "../../../contexts/FirebaseUserContext";
import { themeMode } from "../../../contexts/themeContext";

export const useAppSync = () => {
	const user = useAtomValue(firebaseUser);
	const [me, setMe] = useAtom(myInfo);
	const [group, setGroup] = useAtom(groupInfo);
	const setOwner = useSetAtom(ownerInfo);
	const setRecipes = useSetAtom(recipeContext);
	const setTheme = useSetAtom(themeMode);

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
					console.log("	got group Info: ", snap.data());
				}
			},
		);
		return () => unsubscribeGroup();
	}, [me, setGroup]);

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
	}, [me, setOwner, group]);

	//レシピ一覧の取得
	useEffect(() => {
		if (!me) return; //未ログインならスキップ
		const q = query(
			collection(db, "recipes"),
			where("authorId", "==", me!.uid),
		);
		const unsubsrcibeRecipes = onSnapshot(q, (snap) => {
			const list = snap.docs.map((d) => d.data() as Recipe);
			setRecipes(list);
			console.log("get recipes Info: ", list);
		});

		return () => {
			unsubsrcibeRecipes();
		};
	}, [me, setRecipes]);
};
