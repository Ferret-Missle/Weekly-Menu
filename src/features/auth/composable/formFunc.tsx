export const validateEmail = (value: string) => {
	if (!value) return "メールアドレスを入力してください";
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!regex.test(value)) return "正しいメールアドレスの形式で入力してください";
	return "";
};
export const validatePassword = (value: string) => {
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
