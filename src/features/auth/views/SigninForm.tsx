import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';

import { auth } from '../../../providers/firebase';
import { AuthTypo } from '../../../styles/AuthTypo';
import { validateEmail, validatePassword } from "../composable/validateData";

export const SigninForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState<string>("");
	const [emailError, setEmailError] = useState<string | null>(null);
	const [passwordError, setPasswordError] = useState<string | null>(null);
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const navi = useNavigate();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const emailErr = validateEmail(email);
		const passwordErr = validatePassword(password);
		if (!emailErr && !passwordErr) signInWithEmail();
	};
	const signInWithEmail = async () => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
			navi("/calendar");
		} catch (error: unknown) {
			if (error instanceof Error) setEmailError(error.message);
			console.log("ログイン失敗");
		}
	};

	return (
		<Box component="form" onSubmit={handleSubmit}>
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
				control={
					<Checkbox
						size="small"
						onChange={() => setShowPassword(!showPassword)}
					/>
				}
				label={<AuthTypo role="hint">パスワードを表示</AuthTypo>}
			/>
			<Button
				variant="contained"
				fullWidth
				type="submit"
				disabled={!email || !password}
				sx={{
					mt: 2,
					borderRadius: 2,
					backgroundColor: "icon.active",
					color: "white",
					"@media (hover: hover)": {
						"&:hover": {
							backgroundColor: "icon.hoverBgcolor",
							color: "icon.hoverColor",
						},
					},
				}}
			>
				ログイン
			</Button>
		</Box>
	);
};
