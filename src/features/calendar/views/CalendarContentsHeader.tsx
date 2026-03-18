import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { myInfo } from "../../../contexts/AppUserContext";
import { CalendarTypography } from "../../../styles/CalendarTypo";
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
						<CalendarTypography role="plantab">自分のプラン</CalendarTypography>
					</MenuItem>
					{user?.groupId && user?.groupRole === "member" && (
						<MenuItem value="owner">
							<CalendarTypography role="plantab">
								オーナーのプラン
							</CalendarTypography>
						</MenuItem>
					)}
				</Select>
			</FormControl>
		</Box>
	);
};
