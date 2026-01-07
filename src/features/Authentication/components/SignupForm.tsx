import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";

import { auth } from "../../../providers/firebase";
import { LoginTypography } from "../../../styles/AuthText";

export const SignupForm: React.FC = () => {
	const [email, setEmail] = useState(""); //メールアドレスステート
	const [password, setPassword] = useState(""); //パスワードステート
	const [emailError, setEmailError] = useState<string | null>(null);
	const [passwordError, setPasswordError] = useState<string | null>(null);
	const [agree, setAgree] = useState(false); //パスワード表示切替
	const [submitErr, setSubmitErr] = useState<string | null>(null);

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
			console.log("新規登録 実行");
			signUpWithEmail();
		}
	};
	const signUpWithEmail = async () => {
		try {
			await createUserWithEmailAndPassword(auth, email, password);
			setSubmitErr(null);
		} catch (error: unknown) {
			if (error instanceof Error) setSubmitErr(error.message);
		}
	};
	const handleClickAgree = () => setAgree(!agree);

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
				type="password"
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
				disabled={!email || !password || !agree}
				sx={{ mt: 2, borderRadius: 2 }}
			>
				新規登録
			</Button>
			<LoginTypography role="error">{submitErr}</LoginTypography>
		</Box>
	);
};
