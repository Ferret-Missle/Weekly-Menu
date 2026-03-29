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
	const group = useAtomValue(groupInfo);
	const [groupName, setGroupName] = useState<string>(group ? group.name : "");
	useEffect(() => {
		setGroupName(group ? group.name : "");
	}, [group]);

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
			<Stack spacing={2} color={"customBackground.paper"} sx={{ margin: 2 }}>
				<ContentsTypography role="cardsection">グループ設定</ContentsTypography>
				<Stack>
					<ContentsTypography role="cardcaption">
						現在のグループ
					</ContentsTypography>
					<TextField
						required
						fullWidth
						size="small"
						type="text"
						value={groupName}
						onChange={(e) => setGroupName(e.target.value)}
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
				</Stack>
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