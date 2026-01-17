import type { TypographyProps } from "@mui/material";
import type { User } from "firebase/auth";

//Auth
export type FirebaseUserType = User | null | undefined;
export type AuthMode = "signup" | "signin";
export type AuthTypoType = TypographyProps & {
	role: "title" | "subtitle" | "label" | "hint" | "text";
};
