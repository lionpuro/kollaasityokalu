import type { FilterControlType, FilterIdType } from "@/types";
import type { filters as fabricFilterType } from "fabric";
import { filters as fabricFilter } from "fabric";

export const filters: FilterControlType[] = [
	{
		id: "Brightness",
		min: -1,
		max: 1,
		step: 0.002,
		newFilter: (value) =>
			new fabricFilter.Brightness({
				brightness: value,
			}) as fabricFilterType.BaseFilter<FilterIdType>,
	},
	{
		id: "Contrast",
		min: -1,
		max: 1,
		step: 0.002,
		newFilter: (value) =>
			new fabricFilter.Contrast({
				contrast: value,
			}) as fabricFilterType.BaseFilter<FilterIdType>,
	},
	{
		id: "Saturation",
		min: -1,
		max: 1,
		step: 0.002,
		newFilter: (value) =>
			new fabricFilter.Saturation({
				saturation: value,
			}) as fabricFilterType.BaseFilter<FilterIdType>,
	},
	{
		id: "Vibrance",
		min: -1,
		max: 1,
		step: 0.002,
		newFilter: (value) =>
			new fabricFilter.Vibrance({
				vibrance: value,
			}) as fabricFilterType.BaseFilter<FilterIdType>,
	},
	{
		id: "Blur",
		min: 0,
		max: 1,
		step: 0.002,
		newFilter: (value) =>
			new fabricFilter.Blur({
				blur: value,
			}) as fabricFilterType.BaseFilter<FilterIdType>,
	},
];
