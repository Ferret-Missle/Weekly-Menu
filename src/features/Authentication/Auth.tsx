import React from 'react';

import { LoginTypography } from './components/AuthText';
import { AuthWrapper } from './components/AuthWrapper';
import { Form } from './components/Form';

export const Auth: React.FC = () => {
	return (
		<AuthWrapper>
			<>
				<LoginTypography role="title">献立スケジュール</LoginTypography>
				<LoginTypography role="subtitle">
					週間献立プランとレシピ、買い物リストを管理
				</LoginTypography>
			</>
			<Form />
		</AuthWrapper>
	);
};
