import { useSetAtom } from "jotai";
import { saveButtonFlg } from "../../../contexts/calendarActiveFlg";

export const useResetFlg = () => {
	const setIsDisabled = useSetAtom(saveButtonFlg);
	setIsDisabled(false);
};
