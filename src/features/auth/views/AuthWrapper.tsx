import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

import { ThemeSwitch } from "../../common/views/ThemeSwitch";

import type { ReactNode } from "react";
export const AuthWrapper: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	return (
		<Box
			component="header"
			sx={{
				display: "flex",
				flexDirection: "column",
				minWidth: "100vw",
				bgcolor: "background.default",
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
				<ThemeSwitch />
			</Container>
			<Container
				component="main"
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					minWidth: "100vw",
				}}
			>
				<Paper
					elevation={2}
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						width: "auto",
						minWidth: "300px",
						maxWidth: "450px",
						borderRadius: 3,
						p: 2,
						mt: 8,
						mx: 2,
						bgcolor: "background.paper",
					}}
				>
					<Stack spacing={2} direction={"column"} sx={{ margin: 1 }}>
						{children}
					</Stack>
				</Paper>
			</Container>
		</Box>
	);
};
