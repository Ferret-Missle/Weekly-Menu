import type { TypographyProps } from "@mui/material";
import type { User } from "firebase/auth";
import type { Timestamp } from "firebase/firestore";

//AppData
export type AppUser = {
	//アプリ内ユーザデータ
	uid: string;
	displayName: string | null;
	email: string | null;
	themeMode: "light" | "dark" | null;
	groupId: string | null;
	groupRole: "owner" | "member" | null;
	canMemberEditPlan: boolean;
	isRecipeShared: boolean;
};
export type group = {
	id: string;
	name: string;
	ownerId: string;
	memberIds: string[];
};
export type WeeklyPlan = {
	authorId: string;
	schedule: {
		[date: string]: {
			breakfast?: { recipeId: string; servings: number };
			lunch?: { recipeId: string; servings: number };
			dinner?: { recipeId: string; servings: number };
		};
	};
};
export type Recipe = {
	id: string;
	authorId: string;
	title: string;
	thumbnailUrl: string | null;
	ingredients: string[] | null;
	steps: string[] | null;
	createdAt: Timestamp;
	updatedAt: Timestamp;
};

//Auth
export type FirebaseUserType = User | null | undefined;
export type AuthMode = "signup" | "signin";
export type AuthTypoType = TypographyProps & {
	//認証画面の文字種別
	role: "title" | "subtitle" | "label" | "hint" | "text" | "error";
};

//Contents
export type ContentsModeType = "calendar" | "recipe" | "list";
export type ContentsTypoType = TypographyProps & {
	//カレンダー画面の文字種別
	role:
		| "header"
		| "main"
		| "sub"
		| "period"
		| "cardtitle"
		| "maincol"
		| "subcol"
		| "caption";
};