import { useState } from "react";
import { seedTestData } from "./seedService";
import IconButton from "@mui/material/IconButton";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
export const DeveloperTools = () => {
	const uid = "FntjXHdF1QTatO74BuZx6OFCp"; //個人アカウント
	const [count, setCount] = useState(0);

	const handleClick = async () => {
		const nextCount = count + 1;
		if (nextCount >= 5) {
			setCount(0); // リセット
			if (window.confirm("テストデータを注入しますか？")) {
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
