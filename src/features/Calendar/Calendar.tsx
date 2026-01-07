import { signOut } from 'firebase/auth';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { auth } from '../../providers/firebase';

export const Calendar = () => {
	return (
		<Box>
			<Button onClick={() => signOut(auth)}>LogOut</Button>
		</Box>
	);
};
