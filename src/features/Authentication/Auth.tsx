import React, { useState } from 'react';

import Divider from '@mui/material/Divider';

import { LoginTypography } from '../../styles/AuthText';
import { AuthWrapper } from './components/AuthWrapper';
import { AuthModeSwitch } from './components/ModeParts/AuthModeSwitch';
import { SigninForm } from './components/SigninForm';
import { SignupForm } from './components/SignupForm';
import { SignWithGoogle } from './components/SignWithGoogle';

export type SignMode = "signup" | "signin";

const Auth: React.FC = () => {
	const [mode, setMode] = useState<SignMode>("signin");
	const handleMode = () => {
		setMode(mode === "signin" ? "signup" : "signin");
	};

	return (
		<AuthWrapper>
			<>
				<LoginTypography role="title">献立スケジュール</LoginTypography>
				<LoginTypography role="subtitle">
					週間献立プランとレシピを管理
				</LoginTypography>
			</>
			<AuthModeSwitch mode={mode} handleMode={handleMode} />
			{mode === "signin" ? <SigninForm /> : <SignupForm />}
			<Divider>
				<LoginTypography role="caption">or</LoginTypography>
			</Divider>
			<SignWithGoogle mode={mode} />
		</AuthWrapper>
	);
};

export default Auth;
