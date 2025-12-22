import React, { useState } from 'react';

import { AuthModeSwitch } from './components/AuthModeSwitch';
import { AuthWrapper } from './components/AuthWrapper';
import { SigninForm } from './components/SigninForm';
import { SignupForm } from './components/SignupForm';
import { LoginTypography } from './styles/AuthText';

const Auth: React.FC = () => {
	const [mode, setMode] = useState("signin");
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
		</AuthWrapper>
	);
};

export default Auth;
