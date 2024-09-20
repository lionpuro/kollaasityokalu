const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

function calcMultiplier(width: number, height: number, maxSize: number) {
	const ratio = width / height;
	const maxWidth = Math.sqrt(maxSize * ratio);

	const multiplier = maxWidth / width;
	return multiplier;
}

export default function getMultiplier(width: number, height: number) {
	if (isIOS) {
		const maxArea = 16777216;
		return calcMultiplier(width, height, maxArea);
	} else {
		return 10;
	}
}
