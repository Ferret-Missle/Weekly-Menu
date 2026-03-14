import type { mealType } from "../../../types/types";

export function showMealType(type: mealType) {
	switch (type) {
		case "breakfast":
			return "朝";
		case "lunch":
			return "昼";
		case "dinner":
			return "夜";
	}
}
