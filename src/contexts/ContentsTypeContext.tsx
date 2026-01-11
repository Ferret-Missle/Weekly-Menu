import { atom } from 'jotai';

export type ContentsType = "calendar" | "recipe" | "list";
export const ContentsTypeContext = atom<ContentsType>("calendar");
