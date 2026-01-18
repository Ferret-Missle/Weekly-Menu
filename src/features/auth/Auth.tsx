import { useAtomValue } from "jotai";
import { useState } from "react";

import { firebaseUser } from "../../contexts/FirebaseUserContext";
import { AuthWrapper } from "./views/AuthWrapper";

import type { AuthMode } from "../../types/types";
export const Auth = () => {
	const user = useAtomValue(firebaseUser);
	const [mode, setMode] = useState<AuthMode>("signin");

	return <AuthWrapper>test</AuthWrapper>;
};
