import React from "react";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

import { ThemeModeSwitcher } from "../../../contexts/ThemeModeSitcher";

import type { ReactNode } from "react";
export const AuthWrapper: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	return (
		<>
			<Container
				component="header"
				sx={{
					minWidth: "100vw",
					display: "flex",
					justifyContent: "right",
				}}
			>
				<ThemeModeSwitcher />
			</Container>
			<Container
				component="main"
				sx={{
					padding: 2,
					minHeight: "100vh",
					minWidth: "100vw",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Paper
					elevation={2}
					sx={{
						p: 2,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						width: "auto",
					}}
				>
					<Stack spacing={2} direction={"column"}>
						{children}
					</Stack>
				</Paper>
			</Container>
		</>
	);
};
