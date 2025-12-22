import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';

import { LoginTypography } from '../styles/AuthText';

export const SignupForm: React.FC = () => {
	const [email, setEmail] = useState(""); //メールアドレスステート
	const [password, setPassword] = useState(""); //パスワードステート
	const [emailError, setEmailError] = useState<string | null>(null);
	const [passwordError, setPasswordError] = useState<string | null>(null);
	const [agree, setAgree] = useState(false); //パスワード表示切替

	const validateEmail = (value: string) => {
		if (!value) return "メールアドレスを入力してください";
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!regex.test(value))
			return "正しいメールアドレスの形式で入力してください";
		return "";
	};
	const validatePassword = (value: string) => {
		if (!value) return "パスワードを入力してください";
		if (value.length < 6) return "パスワードは6文字以上で入力してください";
		return "";
	};
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};
	const handleClickAgree = () => {
		setAgree(!agree);
	};

	return (
		<Box component="form" onSubmit={handleSubmit} sx={{ mt: 0 }}>
			<TextField
				required
				fullWidth
				size="small"
				label="メールアドレス"
				autoComplete="email"
				autoFocus
				value={email}
				onChange={(e) => {
					setEmail(e.target.value);
					if (emailError) setEmailError(validateEmail(e.target.value));
				}}
				error={!!emailError}
				helperText={emailError}
				sx={{
					mt: 2,
					mb: 2,
					"& .MuiOutlinedInput-root": {
						borderRadius: 2,
					},
				}}
			/>
			<TextField
				required
				fullWidth
				size="small"
				label="パスワード"
				type="password"
				autoComplete="current-password"
				value={password}
				onChange={(e) => {
					setPassword(e.target.value);
					if (passwordError) setPasswordError(validatePassword(e.target.value));
				}}
				error={!!passwordError}
				helperText={passwordError}
				sx={{
					"& .MuiOutlinedInput-root": {
						borderRadius: 2,
					},
				}}
			/>
			<FormControlLabel
				control={<Checkbox onChange={handleClickAgree} />}
				label={
					<LoginTypography role="caption">
						利用規約とプライバシーポリシーに同意する
					</LoginTypography>
				}
				sx={{ mt: 1 }}
			/>
			<Button
				variant="contained"
				fullWidth
				type="submit"
				disabled={!email || !password}
				sx={{ mt: 2, borderRadius: 2 }}
			>
				新規登録
			</Button>
		</Box>
	);
};
