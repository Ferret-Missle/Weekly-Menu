import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { useState } from "react";
import { useAtomValue } from "jotai";
import { myInfo } from "../../../contexts/AppUserContext";
import { CalendarTypography } from "../../../styles/CalendarTypo";
export const CalendarContentsHeader = () => {
	const [plan, setPlan] = useState("mine");
	const user = useAtomValue(myInfo);

	return (
		<Box sx={{ display: "flex", justifyContent: "flex-start" }}>
			<FormControl size="small" sx={{ minWidth: 120 }}>
				<Select
					labelId="plan-select-label"
					value={plan}
					onChange={(e) => setPlan(e.target.value)}
					sx={{
						borderRadius: 2,
						color: "text.primary",
						backgroundColor: "background.default",
						"&:after": { borderBottomColor: "#FF7043" },
					}}
				>
					<MenuItem value="mine">
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
