import { useAtom } from "jotai";
import { myInfo, ownerInfo } from "../../../contexts/AppUserContext";
import { recipeContext } from "../../../contexts/recipesContext";
import { groupInfo } from "../../../contexts/groupContext";
import { useEffect } from "react";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../providers/firebase";
import type { AppUser, group, Recipe } from "../../../types/types";

export const useAppSync = (uid: string) => {
	const [me, setMe] = useAtom(myInfo);
	const [owner, setOwner] = useAtom(ownerInfo);
	const [recipes, setRecipes] = useAtom(recipeContext);
	const [group, setGroup] = useAtom(groupInfo);

	//ユーザ情報の取得
	useEffect(() => {
		const unsubscribeMe = onSnapshot(doc(db, "users", uid), (snap) => {
			if (snap.exists()) setMe(snap.data() as AppUser);
		});
		return () => unsubscribeMe();
	}, [uid, setMe]);

	//グループ情報の取得
	useEffect(() => {
		//groupIdがなければnullをセットして終了
		if (!me?.groupId) {
			setGroup(null);
			return;
		}

		const unsubscribeGroup = onSnapshot(
			doc(db, "groups", me.groupId),
			(snap) => {
				if (snap.exists()) setGroup(snap.data() as group);
			},
		);
		return () => unsubscribeGroup();
	}, [me?.groupId, setGroup]);

	//オーナー情報の取得
	useEffect(() => {
		//自分がオーナー、グループ未参加の場合はスキップ
		if (!me?.groupId || me.groupRole == "owner") {
			setOwner(null);
			return;
		}

		const unsubscribeOwner = onSnapshot(
			doc(db, "users", group!.ownerId),
			(snap) => {
				if (snap.exists()) setOwner(snap.data() as AppUser);
			},
		);
		return () => unsubscribeOwner();
	}, [me?.groupId, me?.groupRole, setOwner, group]);

	//レシピ一覧の取得
	useEffect(() => {
		const q = query(collection(db, "recipes"), where("authorId", "==", uid));
		const unsubsrcibeRecipes = onSnapshot(q, (snap) => {
			const list = snap.docs.map((d) => d.data() as Recipe);
			setRecipes(list);
		});

		return () => {
			unsubsrcibeRecipes();
		};
	}, [uid, setRecipes]);

	return { me, owner, recipes, group };
};
