import Fab from "@mui/material/Fab";
import SaveIcon from "@mui/icons-material/Save";
import { ContentsTypography } from "../../../styles/ContentsTypo";
import { useAtom, useAtomValue } from "jotai";
import { saveButtonFlg } from "../../../contexts/calendarActiveFlg";
import { usePlansUpload } from "../composable/usePlansUpload";
import { dispDate } from "../../../contexts/date";
import { useEffect, useState } from "react";
import type { snackbarType } from "../../../types/types";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { myInfo, ownerInfo } from "../../../contexts/AppUserContext";

export const SavingChangeFAB = () => {
	const date = useAtomValue(dispDate);
	const user = useAtomValue(myInfo); //誰のプランを表示中か
	const owner = useAtomValue(ownerInfo);
	const [isDisabled, setIsDisabled] = useAtom(saveButtonFlg);
	const { saveAll } = usePlansUpload(); //Firestoreにアップロード
	const [snack, setSnack] = useState<snackbarType>({
		open: false,
		msg: "",
		severity: "success",
	});

	useEffect(() => {
		//表示日付が変更されたら保存ボタンをDisabled
		setIsDisabled(false);
	}, [date, setIsDisabled]);

	const handleSave = async () => {
		//ownerのプラン表示中かつOwnerがメンバー編集権限をfalseにしている場合
		if (user?.displayPlan === "owner" && owner?.canMemberEditPlan === false) {
			setSnack({
				open: true,
				msg: "グループオーナーがメンバーによるプラン編集を許可していません",
				severity: "error",
			});

			return;
		}

		setIsDisabled(false); //保存ボタンを無効化
		try {
			await saveAll();
			setSnack({ open: true, msg: "保存成功", severity: "success" });
		} catch (error: unknown) {
			console.log(error);
			setSnack({
				open: true,
				msg: "保存に失敗しました。再試行してください。",
				severity: "error",
			});
		}
	};

	return (
		<>
			<Fab
				color="primary"
				variant="extended"
				disabled={!isDisabled}
				onClick={handleSave}
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
				<ContentsTypography role="button">保存</ContentsTypography>
			</Fab>
			<Snackbar
				open={snack.open}
				autoHideDuration={5000}
				onClose={() => setSnack((s) => ({ ...s, open: false }))}
			>
				<Alert
					onClose={() => setSnack((s) => ({ ...s, open: false }))}
					severity={snack.severity}
					sx={{ width: "60vw" }}
				>
					{snack.msg}
				</Alert>
			</Snackbar>
		</>
	);
};