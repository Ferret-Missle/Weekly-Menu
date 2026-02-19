import GroupsIcon from "@mui/icons-material/Groups2";
import IconButton from "@mui/material/IconButton";
export const GroupSettingButton = () => {
	return (
		<IconButton>
			<GroupsIcon
				sx={(theme) => ({
					[theme.breakpoints.up("xs")]: { fontSize: "32px" },
					[theme.breakpoints.up("sm")]: { fontSize: "28px" },
					[theme.breakpoints.up("lg")]: { fontSize: "24px" },
				})}
			/>
		</IconButton>
	);
};
