import { ASPECT_RATIOS } from "@/constants/canvasConfig";

export default function findAspectRatio(name: string) {
	const found = ASPECT_RATIOS.find((ratio) => ratio.name === name);
	if (!found) {
		return ASPECT_RATIOS[0];
	}
	return found;
}
