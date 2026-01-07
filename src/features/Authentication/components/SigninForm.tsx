import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';

import { auth } from '../../../providers/firebase';
import { LoginTypography } from '../../../styles/AuthText';

export const SigninForm: React.FC = () => {
	const [email, setEmail] = useState(""); //メールアドレスステート
	const [password, setPassword] = useState(""); //パスワードステート
	const [emailError, setEmailError] = useState<string | null>(null);
	const [passwordError, setPasswordError] = useState<string | null>(null);
	const [showPassword, setShowPassword] = useState(false); //パスワード表示切替
	const navi = useNavigate();

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
		if (!/[a-z]/.test(value))
			return "パスワードには小文字（a-z）を少なくとも1文字含めてください";
		if (!/[A-Z]/.test(value))
			return "パスワードには大文字（A-Z）を少なくとも1文字含めてください";
		if (!/[0-9]/.test(value))
			return "パスワードには数字（0-9）を少なくとも1文字含めてください";
		return "";
	};
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const emailErr = validateEmail(email);
		const passwordErr = validatePassword(password);
		setEmailError(emailErr || null);
		setPasswordError(passwordErr || null);

		if (!emailErr && !passwordErr) {
			signInWithEmail();
		}
	};
	const signInWithEmail = async () => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
			console.log("ログイン成功");
			navi("/Calendar");
		} catch (error: unknown) {
			if (error instanceof Error) setEmailError(error.message);
			console.log("ログイン失敗");
		}
	};
	const handleClickShowPassword = () => setShowPassword(!showPassword);

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
				onChange={(e) => setEmail(e.target.value)}
				onBlur={() => setEmailError(validateEmail(email) || null)}
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
				type={showPassword ? "text" : "password"}
				autoComplete="current-password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				onBlur={() => setPasswordError(validatePassword(password) || null)}
				error={!!passwordError}
				helperText={passwordError}
				sx={{
					"& .MuiOutlinedInput-root": {
						borderRadius: 2,
					},
				}}
			/>
			<FormControlLabel
				control={<Checkbox size="small" onChange={handleClickShowPassword} />}
				label={
					<LoginTypography role="caption">パスワードを表示</LoginTypography>
				}
			/>
			<Button
				variant="contained"
				fullWidth
				type="submit"
				disabled={!email || !password}
				sx={{ mt: 2, borderRadius: 2 }}
			>
				ログイン
			</Button>
		</Box>
	);
};
