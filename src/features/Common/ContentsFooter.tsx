import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';

import { ContentsTypography } from '../../styles/ContentsText';

import type { ReactNode } from "react";
export const ContentsFooter = () => {
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
					<ButtonWrapper>
						<Stack
							direction="column"
							spacing={0.5}
							sx={{ alignItems: "center" }}
						>
							<CalendarMonthOutlinedIcon
								fontSize="large"
								sx={{ color: "text.primary" }}
							/>
							<ContentsTypography role="sub">献立プラン</ContentsTypography>
						</Stack>
					</ButtonWrapper>
					<ButtonWrapper>
						<Stack
							direction="column"
							spacing={0.5}
							sx={{ alignItems: "center" }}
						>
							<AutoStoriesOutlinedIcon
								fontSize="large"
								sx={{ color: "text.primary" }}
							/>
							<ContentsTypography role="sub">レシピ</ContentsTypography>
						</Stack>
					</ButtonWrapper>
					<ButtonWrapper>
						<Stack
							direction="column"
							spacing={0.5}
							sx={{ alignItems: "center" }}
						>
							<ShoppingCartOutlinedIcon
								fontSize="large"
								sx={{ color: "text.primary" }}
							/>
							<ContentsTypography role="sub">買い物リスト</ContentsTypography>
						</Stack>
					</ButtonWrapper>
				</Stack>
			</Toolbar>
		</AppBar>
	);
};

const ButtonWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
	return <Button sx={{ width: "100%" }}>{children}</Button>;
};
