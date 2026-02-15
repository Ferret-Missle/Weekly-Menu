import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { myInfo, ownerInfo } from "../../../contexts/AppUserContext";
import { recipeContext } from "../../../contexts/recipesContext";
import { groupInfo } from "../../../contexts/groupContext";
import { useEffect } from "react";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../providers/firebase";
import type { AppUser, group, Recipe } from "../../../types/types";
import { firebaseUser } from "../../../contexts/FirebaseUserContext";

export const useAppSync = () => {
	const [me, setMe] = useAtom(myInfo);
	const [group, setGroup] = useAtom(groupInfo);
	const setOwner = useSetAtom(ownerInfo);
	const setRecipes = useSetAtom(recipeContext);
	const user = useAtomValue(firebaseUser);

	console.log("useAppSync called:", user?.uid);

	//ユーザ情報の取得
	useEffect(() => {
		console.log("  start user exists check");
		if (!user) return; //未ログインならスキップ
		console.log("    pass user exists check");
		const unsubscribeMe = onSnapshot(doc(db, "users", user!.uid), (snap) => {
			console.log("  start snap exists check");
			if (snap.exists()) {
				console.log("    pass snap exists check");
				setMe(snap.data() as AppUser);
				console.log("get myInfo: ", snap.data());
			}
		});
		return () => unsubscribeMe();
	}, [user, setMe]);

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
	}, [me, setGroup]);

	//オーナー情報の取得
	useEffect(() => {
		if (!me) return; //未ログインならスキップ
		//自分がオーナー、グループ未参加の場合はスキップ
		if (!me!.groupId || me!.groupRole == "owner") {
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
