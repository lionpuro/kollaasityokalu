import { ASPECT_RATIOS } from "@/constants/canvasConfig";
import { AspectRatioType } from "@/types";

export default function getAspectRatios(): AspectRatioType[] {
	const urlParams = new URLSearchParams(window.location.search);
	const pSize = urlParams.get("pSize");
	if (!pSize) {
		return ASPECT_RATIOS;
	}

	switch (pSize) {
		case "30x40":
			return ASPECT_RATIOS.filter(
				(ratio) => ratio.name === "4:3" || ratio.name === "3:4"
			);
		case "40x60":
		case "60x90":
			return ASPECT_RATIOS.filter(
				(ratio) => ratio.name === "2:3" || ratio.name === "3:2"
			);
		case "30x30":
		case "40x40":
		case "50x50":
		case "60x60":
			return ASPECT_RATIOS.filter((ratio) => ratio.name === "1:1");
		default:
			return ASPECT_RATIOS;
	}
}
