import { useAtomValue } from 'jotai';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import { firebaseUser } from '../../../../contexts/FirebaseUserContext';

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
	const user = useAtomValue(firebaseUser);
	const navi = useNavigate();
	// console.log("現在のuser状態：", user);

	if (user === undefined) {
		//ログイン試行中
		return (
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<CircularProgress />
			</Box>
		);
	}
	if (user === null) {
		//未ログイン
		navi("/");
	}
	return children;
};
