import Box from '@mui/material/Box';

import { ContentsFooter } from './ContentsFooter';
import { ContetnsHeader } from './ContentsHeader';

import type { ReactNode } from "react";
export const ContentsWrapper: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				minWidth: "100vw",
				minHeight: "100vh",
			}}
		>
			<ContetnsHeader />
			<Box
				component="main"
				sx={{
					display: "flex",
					flexGrow: 1,
				}}
			>
				{children}
			</Box>
			<ContentsFooter />
		</Box>
	);
};
