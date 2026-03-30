import GroupsIcon from "@mui/icons-material/Groups2";
import Popover from "@mui/material/Popover";
import IconButton from "@mui/material/IconButton";
import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import { ContentsTypography } from "../../../styles/ContentsTypo";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAtomValue } from "jotai";
import { groupInfo } from "../../../contexts/groupContext";
import { myInfo } from "../../../contexts/AppUserContext";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
	canMemberEditPlanUpdate,
	isRecipeSharedUpdate,
} from "../../recipe/composable/uploadUserData";
export const GroupSettingButton = () => {
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const open = Boolean(anchorEl);

	return (
		<>
			<IconButton onClick={handleClick}>
				<GroupsIcon
					sx={(theme) => ({
						[theme.breakpoints.up("xs")]: { fontSize: "32px" },
						[theme.breakpoints.up("sm")]: { fontSize: "28px" },
						[theme.breakpoints.up("lg")]: { fontSize: "24px" },
					})}
				/>
			</IconButton>
			<GroupSettingMenu
				open={open}
				anchorEl={anchorEl}
				handleClose={handleClose}
			/>
		</>
	);
};

const GroupSettingMenu = ({
	open,
	anchorEl,
	handleClose,
}: {
	open: boolean;
	anchorEl: HTMLElement | null;
	handleClose: () => void;
}) => {
	const user = useAtomValue(myInfo);
	const group = useAtomValue(groupInfo);
	const [groupName, setGroupName] = useState<string>(
		group ? group.groupName : "",
	);
	useEffect(() => {
		setGroupName(group ? group.groupName : "");
	}, [group, open]);

	const isOwner = group?.ownerId === user?.uid; //オーナーの場合はtrue

	const [canEdit, setCanEdit] = useState<boolean>(
		user ? user?.canMemberEditPlan : false,
	);
	const [isShared, setIsShared] = useState<boolean>(
		user ? user?.isRecipeShared : false,
	);

	useEffect(() => {
		setCanEdit(user ? user?.canMemberEditPlan : false);
		setIsShared(user ? user?.isRecipeShared : false);
	}, [user]);

	console.log("group: ", group);

	return (
		<Popover
			open={open}
			anchorEl={anchorEl}
			onClose={handleClose}
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "left",
			}}
			transformOrigin={{
				vertical: "top",
				horizontal: "center",
			}}
			sx={{ borderRadius: "8px" }}
		>
			<Stack spacing={3} color={"customBackground.paper"} sx={{ margin: 2 }}>
				<ContentsTypography role="cardsection">グループ設定</ContentsTypography>
				<Stack>
					<ContentsTypography role="cardcaption" sx={{ marginBottom: 1 }}>
						現在のグループ
					</ContentsTypography>
					<TextField
						required
						fullWidth
						size="small"
						type="text"
						value={groupName}
						onChange={(e) => setGroupName(e.target.value)}
						slotProps={{ input: { readOnly: !isOwner } }}
						sx={{
							"& .MuiOutlinedInput-root": {
								borderRadius: "8px",
								backgroundColor: "customBackground.container",
								"& fieldset": {
									border: "none", // 枠線を消す
								},
								"&:hover fieldset": {
									border: "none",
								},
								"&.Mui-focused fieldset": {
									border: "none",
								},
							},
							"& .MuiOutlinedInput-input": {
								fontSize: "14px",
								padding: "8px 14px",
							},
						}}
					/>
					<ContentsTypography role="footer" sx={{ marginTop: 1 }}>
						※オーナーのみ変更可能
					</ContentsTypography>
				</Stack>
				{group?.ownerId === user?.uid ? (
					<FormControlLabel
						control={
							<Switch
								checked={canEdit}
								onChange={(_, checked) => {
									setCanEdit(checked);
									canMemberEditPlanUpdate(user!, !checked);
								}}
							/>
						}
						label="献立プランの変更の許可"
						slotProps={{
							typography: { fontSize: "0.8rem" },
						}}
					/>
				) : null}
				<FormControlLabel
					control={
						<Switch
							checked={isShared}
							onChange={(_, checked) => {
								setIsShared(checked);
								isRecipeSharedUpdate(user!, !checked);
							}}
						/>
					}
					label="他メンバーへのレシピ共有"
					slotProps={{
						typography: { fontSize: "0.8rem" },
					}}
				/>
				<Stack spacing={1}>
					<Button
						variant="contained"
						fullWidth
						size="small"
						sx={{ borderRadius: 2, color: "white", fontSize: "12px" }}
					>
						設定を保存
					</Button>
					<Button
						variant="contained"
						fullWidth
						size="small"
						sx={{
							borderRadius: 2,
							bgcolor: "white",
							color: "red",
							fontSize: "12px",
							textAlign: "center",
						}}
					>
						<LogoutIcon sx={{ fontSize: "16px" }} />
						グループから離脱
					</Button>
				</Stack>
			</Stack>
		</Popover>
	);
};