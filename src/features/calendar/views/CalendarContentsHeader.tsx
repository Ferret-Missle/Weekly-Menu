import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { myInfo } from "../../../contexts/AppUserContext";
import { ContentsTypography } from "../../../styles/ContentsTypo";
import { uploadDisplayPlan } from "../../auth/composable/uploadFirebaseData";

export const CalendarContentsHeader = () => {
	const user = useAtomValue(myInfo);
	const [plan, setPlan] = useState<string>(user?.displayPlan ?? "user");
	useEffect(() => {
		setPlan(user?.displayPlan ?? "user");
	}, [user?.displayPlan]);

	const handleChangePlan = (planType: string) => {
		setPlan(planType); //UI表示を変更
		uploadDisplayPlan(planType, user!.uid); //表示するプランの切替をFirestoreに保存
	};

	return (
		<Box sx={{ display: "flex", justifyContent: "flex-start" }}>
			<FormControl size="small" sx={{ minWidth: 120 }}>
				<Select
					labelId="plan-select-label"
					value={plan}
					onChange={(e) => handleChangePlan(e.target.value)}
					sx={{
						borderRadius: 2,
						color: "text.primary",
						backgroundColor: "background.default",
						"&:after": { borderBottomColor: "#FF7043" },
					}}
				>
					<MenuItem value="user">
						<ContentsTypography role="plantab">自分のプラン</ContentsTypography>
					</MenuItem>
					{user?.groupId && user?.groupRole === "member" && (
						<MenuItem value="owner">
							<ContentsTypography role="plantab">
								オーナーのプラン
							</ContentsTypography>
						</MenuItem>
					)}
				</Select>
			</FormControl>
		</Box>
	);
};
