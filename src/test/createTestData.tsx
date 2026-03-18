import { useState } from "react";
import { seedTestData } from "./seedService";
// import { useAtomValue } from "jotai";
// import { firebaseUser } from "../contexts/FirebaseUserContext";
import IconButton from "@mui/material/IconButton";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
export const DeveloperTools = () => {
	// const user = useAtomValue(firebaseUser);
	const uid="FntjXHdF1QTatO74BuZx6OFCpvt2";//個人アカウント
	// const uid = "JqkR6JWDmufM3jolXHRQHA5nDRv2";//藍子
	const [count, setCount] = useState(0);

	const handleClick = async () => {
		const nextCount = count + 1;
		if (nextCount >= 5) {
			setCount(0); // リセット
			if ( window.confirm("テストデータを注入しますか？")) {
				console.log("userId: ", uid);
				await seedTestData(uid);
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
};;
