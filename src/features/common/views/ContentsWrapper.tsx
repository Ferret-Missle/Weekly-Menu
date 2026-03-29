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
import { showHeaderTitle } from "../composable/showHeaderTitle";
import { SignoutButton } from "./SignoutButton";
import { ThemeSwitch } from "./ThemeSwitch";

import { type ReactNode } from "react";
import type { ContentsModeType } from "../../../types/types";
import { useNavigate } from "react-router-dom";
import { GroupSettingButton } from "./GroupSettingButton";
import { DeveloperTools } from "../../../test/createTestData";
import { ContentsTypography } from "../../../styles/ContentsTypo";

export const ContentsWrapper: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				minWidth: "400px",
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
				<ContentsTypography role="header" sx={{ flexGrow: 1 }}>
					{showHeaderTitle(mode)}
				</ContentsTypography>
				<Stack direction={"row"} spacing={1}>
					<DeveloperTools />
					<GroupSettingButton />
					<ThemeSwitch />
					<SignoutButton />
				</Stack>
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
						<CalendarMonthOutlinedIcon
							sx={(theme) => ({
								[theme.breakpoints.up("xs")]: { fontSize: "24px" },
								[theme.breakpoints.up("sm")]: { fontSize: "20px" },
								[theme.breakpoints.up("lg")]: { fontSize: "16px" },
							})}
						/>
					</ButtonWrapper>
					<ButtonWrapper caption="recipe">
						<AutoStoriesOutlinedIcon
							sx={(theme) => ({
								[theme.breakpoints.up("xs")]: { fontSize: "24px" },
								[theme.breakpoints.up("sm")]: { fontSize: "20px" },
								[theme.breakpoints.up("lg")]: { fontSize: "16px" },
							})}
						/>
					</ButtonWrapper>
					<ButtonWrapper caption="list">
						<ShoppingCartOutlinedIcon
							sx={(theme) => ({
								[theme.breakpoints.up("xs")]: { fontSize: "24px" },
								[theme.breakpoints.up("sm")]: { fontSize: "20px" },
								[theme.breakpoints.up("lg")]: { fontSize: "16px" },
							})}
						/>
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
			onClick={() => {
				setMode(caption);
				navigate(`/${caption}`);
			}}
			sx={{
				width: "100%",
				"@media (hover: hover)": {
					"&:hover": {
						backgroundColor: "icon.hoverBgcolor",
						color: "icon.hoverColor",
					},
				},
				"&:active": { transform: "scale(0.95)" },
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
				<ContentsTypography
					role="footer"
					sx={{ color: mode === caption ? "icon.active" : "icon.inactive" }}
				>
					{buttonCaption}
				</ContentsTypography>
			</Stack>
		</Button>
	);
};

