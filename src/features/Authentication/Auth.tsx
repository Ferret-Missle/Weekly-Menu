import React from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { ThemeModeSwitcher } from "./components/ThemeModeSitcher";

const Auth: React.FC = () => {
	return (
		<Container component="main" maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Paper
					elevation={3}
					sx={{
						p: 4,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						width: "100%",
					}}
				>
					<Typography component="h1" variant="h5">
						Login
					</Typography>

					<Box sx={{ mt: 3 }}>
						<Typography variant="body2" color="text.secondary" align="center">
							テーマを切り替える：
						</Typography>
						<ThemeModeSwitcher />
					</Box>
				</Paper>
			</Box>
		</Container>
	);
};

export default Auth;
