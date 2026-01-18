import type { TypographyProps } from "@mui/material";
import type { User } from "firebase/auth";

//Auth
export type FirebaseUserType = User | null | undefined;
export type AuthMode = "signup" | "signin";
export type AuthTypoType = TypographyProps & {
	role: "title" | "subtitle" | "label" | "hint" | "text" | "error";
};
export type ContentsTypoType = TypographyProps & {
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