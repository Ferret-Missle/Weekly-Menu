import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { LoginTypography } from './components/AuthText';
import { AuthWrapper } from './components/AuthWrapper';

const Auth: React.FC = () => {
	return (
		<AuthWrapper>
			<>
				<LoginTypography role="title">献立スケジュール</LoginTypography>
				<LoginTypography role="subtitle">週間献立プランとレシピ、買い物リストを管理</LoginTypography>
			</>
			<Box sx={{ mt: 3 }}>
				<Typography variant="body2" color="text.secondary" align="center">
					テーマを切り替える：
				</Typography>
			</Box>
		</AuthWrapper>
	);
};

export default Auth;
