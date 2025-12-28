import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import googleIcon from '../../../assets/google.svg';
import { LoginTypography } from '../../../styles/AuthText';

export const SignWithGoogle: React.FC<{ mode: string }> = ({ mode }) => {
	return (
		<Stack spacing={1} sx={{ alignItems: "center", width: "auto" }}>
			<IconButton sx={{ bgcolor: "white", border: "0.5px solid" }}>
				<img src={googleIcon} alt="Google Icon" />
			</IconButton>
			<LoginTypography role="caption" sx={{ color: "text.primary" }}>
				{mode === "signin" ? "Googleでログイン" : "Googleで新規登録"}
			</LoginTypography>
		</Stack>
	);
};
