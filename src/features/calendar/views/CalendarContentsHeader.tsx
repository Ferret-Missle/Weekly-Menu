import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { useState } from "react";
export const CalendarContentsHeader = () => {
	const [plan, setPlan] = useState("mine");

	return (
		<Box sx={{ display: "flex", justifyContent: "flex-start" }}>
			<FormControl size="small" sx={{ minWidth: 120 }}>
				<Select
					labelId="plan-select-label"
					value={plan}
					onChange={(e) => setPlan(e.target.value)}
					sx={{
						color: "text.primary",
						backgroundColor: "background.default",
						"&:after": { borderBottomColor: "#FF7043" },
					}}
				>
					<MenuItem value="mine">自分のプラン</MenuItem>
					<MenuItem value="owner">オーナーのプラン</MenuItem>
				</Select>
			</FormControl>
		</Box>
	);
};
