import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';

import { auth } from '../../../providers/firebase';
import { AuthTypo } from '../../../styles/AuthTypo';
import { validateEmail, validatePassword } from '../composable/formFunc';

export const SignupForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState<string>("");
	const [emailError, setEmailError] = useState<string | null>(null);
	const [passwordError, setPasswordError] = useState<string | null>(null);
	const [agree, setAgree] = useState(false); //パスワード表示切替
	const [submitErr, setSubmitErr] = useState<string | null>(null);
	const navi = useNavigate();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const emailErr = validateEmail(email);
		const passwordErr = validatePassword(password);
		if (!emailErr && !passwordErr) signUpWithEmail();
	};
	const signUpWithEmail = async () => {
		try {
			await createUserWithEmailAndPassword(auth, email, password);
			setSubmitErr(null);
			navi("/calendar");
		} catch (error: unknown) {
			if (error instanceof Error) setSubmitErr(error.message);
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
				control={<Checkbox onChange={() => setAgree(!agree)} />}
				label={
					<AuthTypo role="text">
						利用規約とプライバシーポリシーに同意する
					</AuthTypo>
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
			<AuthTypo role="error">{submitErr}</AuthTypo>
		</Box>
	);
};
