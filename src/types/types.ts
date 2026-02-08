import type { TypographyProps } from "@mui/material";
import type { User } from "firebase/auth";

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
export type WeeklyPlan = {
	authorId: string;
	schedule: {
		[data: string]: {
			breakfast?: { redipeId: string; servings: number };
			lunch?: { redipeId: string; servings: number };
			dinner?: { redipeId: string; servings: number };
		};
	};
};
export type Recipe = {
	id: string;
	authorId: string;
	title: string;
	thumbnailUrl: string;
	ingredients: string[];
	steps: string[];
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