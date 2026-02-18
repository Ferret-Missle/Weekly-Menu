export function showDateString(dateStr: Date) {
	const date = new Date(dateStr);
	const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"][date.getDay()];
	const result = `${date.getMonth() + 1}月${date.getDate()}日(${dayOfWeek})`;

	return result;
}

export function getPeriodString(dateStr: Date) {
	const date = new Date(dateStr);
	const day = date.getDay(); //曜日を取得
	const diffToMonday = day === 0 ? -6 : 1 - day; //月曜日との差分を取得
	const monday = new Date(date);
	monday.setDate(date.getDate() + diffToMonday);
	const sunday = new Date(date);
	sunday.setDate(monday.getDate() + 6);

	return `${monday.getFullYear()}/${monday.getMonth() + 1}/${monday.getDate()} - ${sunday.getMonth() + 1}/${sunday.getDate()}`;
}

export function isDisabled(dateStr: Date) {
	//引数の日付が今週に含まれるか判定
	const today = new Date();
	return getMondayComp(today) === getMondayComp(dateStr) ? true : false;
}

export function getMonday(d: Date) {
	//月曜日を算出する
	const target = new Date(d);
	const day = target.getDay();
	const diff = day === 0 ? -6 : 1 - day; // 日曜なら-6、それ以外は1-day
	target.setDate(target.getDate() + diff);
	return target; // 比較のためにタイムスタンプを返す
}

function getMondayComp(d: Date) {
	//月曜日を算出する
	const target = new Date(d);
	target.setHours(0, 0, 0, 0); // 時刻をリセット
	const day = target.getDay();
	const diff = day === 0 ? -6 : 1 - day; // 日曜なら-6、それ以外は1-day
	target.setDate(target.getDate() + diff);
	return target.getTime(); // 比較のためにタイムスタンプを返す
}
