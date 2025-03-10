import type { filters } from "fabric";

export type FilterIdType =
	| "Brightness"
	| "Contrast"
	| "Saturation"
	| "Vibrance"
	| "Blur";

export type FilterListType =
	| filters.Brightness
	| filters.Contrast
	| filters.Saturation
	| filters.Vibrance
	| filters.Pixelate
	| filters.Blur;

export type LowercaseFilterIdType = Lowercase<FilterIdType>;

export interface FilterControlType {
	id: FilterIdType;
	min: number;
	max: number;
	step: number;
	newFilter: (value: number) => filters.BaseFilter<FilterIdType>;
}

export interface FilterControlTypeProps extends FilterControlType {
	isMobile: boolean;
	activeFilter: FilterIdType | null;
	setActiveFilter: (value: FilterIdType | null) => void;
}
