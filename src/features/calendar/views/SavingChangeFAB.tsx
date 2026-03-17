import Fab from "@mui/material/Fab";
import SaveIcon from "@mui/icons-material/Save";
import { CalendarTypography } from "../../../styles/CalendarTypo";
import { useAtom, useAtomValue } from "jotai";
import { saveButtonFlg } from "../../../contexts/calendarActiveFlg";
import { usePlansUpload } from "../composable/usePlansUpload";
import { dispDate } from "../../../contexts/date";
import { useEffect } from "react";

export const SavingChangeFAB = () => {
	const [isDisabled, setIsDisabled] = useAtom(saveButtonFlg);
	const { saveAll } = usePlansUpload(); //Firestoreにアップロード
	const date = useAtomValue(dispDate);

	useEffect(() => {
		//表示日付が変更されたら保存ボタンをDisabled
		setIsDisabled(false);
	}, [date, setIsDisabled]);

	return (
		<Fab
			color="primary"
			variant="extended"
			disabled={!isDisabled}
			onClick={async () => {
				setIsDisabled(false);
				await saveAll();
			}} //usePlansUploadに差し替え
			sx={{
				position: "fixed",
				bottom: 74,
				right: { xs: 24, md: 32 },
				boxShadow: 4,
				borderRadius: 3,
				backgroundColor: "icon.active",
				color: "white",
				"&.Mui-disabled": {
					color: "gray",
				},
				"@media (hover: hover)": {
					"&:hover": {
						backgroundColor: "icon.hoverBgcolor",
						color: "icon.hoverColor",
					},
				},
				"&:active": { transform: "scale(0.95)" },
			}}
		>
			<SaveIcon sx={{ mr: 1 }} />
			<CalendarTypography role="button">保存</CalendarTypography>
		</Fab>
	);
};