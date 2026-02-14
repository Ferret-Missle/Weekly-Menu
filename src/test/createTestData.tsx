import { useState } from "react";
import { seedTestData } from "./seedService";
import { useAtomValue } from "jotai";
import { firebaseUser } from "../contexts/FirebaseUserContext";
import IconButton from "@mui/material/IconButton";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
export const DeveloperTools = () => {
	const user = useAtomValue(firebaseUser);
	const [count, setCount] = useState(0);

	const handleClick = async () => {
		const nextCount = count + 1;
		if (nextCount >= 5) {
			setCount(0); // リセット
			if (user && window.confirm("テストデータを注入しますか？")) {
				console.log("userId: ", user.uid);
				await seedTestData(user.uid);
			}
		} else {
			setCount(nextCount);
		}
	};

	return (
		<IconButton onClick={handleClick}>
			<BuildCircleIcon />
		</IconButton>
	);
};
