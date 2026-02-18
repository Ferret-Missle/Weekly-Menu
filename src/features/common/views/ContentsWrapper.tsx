import { useAtom, useAtomValue } from "jotai";

import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";

import { contentsMode } from "../../../contexts/ContentsModeContext";
import { CalendarTypography } from "../../../styles/CalendarTypo";
import { showHeaderTitle } from "../composable/showHeaderTitle";
import { SignoutButton } from "./SignoutButton";
import { ThemeSwitch } from "./ThemeSwitch";

import type { ReactNode } from "react";
import type { ContentsModeType } from "../../../types/types";
import { useNavigate } from "react-router-dom";
import { GroupSettingButton } from "./GroupSettingButton";
import { DeveloperTools } from "../../../test/createTestData";

export const ContentsWrapper: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				minWidth: "100%",
				minHeight: "100%",
			}}
		>
			<ContentsHeader />
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					overflow: "auto",
					display: "flex",
					justifyContent: "center",
					pt: 6,
					pb: 8,
				}}
			>
				<Box
					sx={(theme) => ({
						[theme.breakpoints.up("xs")]: { width: "100%" },
						[theme.breakpoints.up("sm")]: { width: "80%" },
						[theme.breakpoints.up("lg")]: { width: "50%" },
					})}
				>
					<Stack spacing={2} direction={"column"} sx={{ p: 2 }}>
						{children}
					</Stack>
				</Box>
			</Box>
			<ContentsNavigator />
		</Box>
	);
};

const ContentsHeader = () => {
	const mode = useAtomValue(contentsMode);
	return (
		<AppBar
			position="fixed"
			sx={{
				backgroundColor: "background.paper",
				border: "1px solid",
				borderColor: "customBackground.container",
				boxShadow: "none",
			}}
		>
			<Toolbar variant="dense">
				<CalendarTypography role="header" sx={{ flexGrow: 1 }}>
					{showHeaderTitle(mode)}
				</CalendarTypography>
				<DeveloperTools />
				<GroupSettingButton />
				<ThemeSwitch />
				<SignoutButton />
			</Toolbar>
		</AppBar>
	);
};
const ContentsNavigator = () => {
	return (
		<AppBar
			position="fixed"
			sx={{
				backgroundColor: "background.paper",
				border: "1px solid",
				borderColor: "customBackground.container",
				boxShadow: "none",
				top: "auto",
				bottom: "0",
			}}
		>
			<Toolbar variant="dense">
				<Stack
					direction="row"
					justifyContent="space-evenly"
					sx={{ width: "100%" }}
				>
					<ButtonWrapper caption="calendar">
						<CalendarMonthOutlinedIcon sx={{ fontSize: "28px" }} />
					</ButtonWrapper>
					<ButtonWrapper caption="recipe">
						<AutoStoriesOutlinedIcon sx={{ fontSize: "28px" }} />
					</ButtonWrapper>
					<ButtonWrapper caption="list">
						<ShoppingCartOutlinedIcon sx={{ fontSize: "28px" }} />
					</ButtonWrapper>
				</Stack>
			</Toolbar>
		</AppBar>
	);
};

const ButtonWrapper = ({
	children,
	caption,
}: {
	children: ReactNode;
	caption: ContentsModeType;
}) => {
	const navigate = useNavigate();
	const [mode, setMode] = useAtom(contentsMode);
	let buttonCaption = "";
	if (caption === "calendar") {
		buttonCaption = "献立プラン";
	} else if (caption === "recipe") {
		buttonCaption = "レシピ";
	} else if (caption === "list") {
		buttonCaption = "買い物リスト";
	}

	return (
		<Button
			sx={{ width: "100%" }}
			onClick={() => {
				setMode(caption);
				navigate(`/${caption}`);
			}}
		>
			<Stack
				direction="column"
				spacing={0.5}
				sx={{
					alignItems: "center",
					color: mode === caption ? "icon.active" : "icon.inactive",
				}}
			>
				{children}
				<CalendarTypography
					role="footer"
					sx={{ color: mode === caption ? "icon.active" : "icon.inactive" }}
				>
					{buttonCaption}
				</CalendarTypography>
			</Stack>
		</Button>
	);
};

