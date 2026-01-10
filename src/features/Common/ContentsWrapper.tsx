import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import { SignoutButton } from "./SignoutButton";
import { ThemeModeSwitcher } from "./ThemeModeSwitcher";

// import type { ReactNode } from "react";
// export const ContentsWrapper: React.FC<{ children: ReactNode }> = ({
// 	children,
// }) => {
export const ContentsWrapper = () => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				minWidth: "100vw",
			}}
		>
			<Container
				sx={{
					display: "flex",
					justifyContent: "right",
					minWidth: "100vw",
					height: "auto",
				}}
			>
				<SignoutButton />
				<ThemeModeSwitcher />
			</Container>
		</Box>
	);
};
