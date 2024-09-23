import { SVGProps } from "react";

export default function ReturnIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height="24px"
			viewBox="0 -960 960 960"
			width="24px"
			fill="#000000"
			{...props}
		>
			<path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
		</svg>
	);
}