import { useRatioAction, useCanvasAction } from "@/hooks/useReduxAction";
import { useCanvasConfigData } from "@/hooks/useReduxData";
import getAspectRatios from "@/utils/getAspectRatios";
import clsx from "clsx";
import toast from "react-hot-toast";

export default function TabRatio() {
	const { activeRatioName } = useCanvasConfigData();
	const { changeRatio } = useRatioAction();
	const { setAddBorderAction } = useCanvasAction();

	return (
		<>
			<div className="flex flex-nowrap place-items-start text-white sm:flex-wrap">
				{getAspectRatios().map((ratio) => {
					return (
						<button
							key={`ratio-${ratio.name}`}
							aria-label={`vaihda kuvasuhde ${ratio.name}`}
							className={clsx(
								"cursor-pointer rounded transition-colors",
								"flex flex-col items-center justify-center text-center",
								"mx-1 h-20 w-20",
								"md:w-[calc(50%-8px)]",
								"sm:mb-2 sm:w-full",
								{
									"bg-neutral-800": ratio.name === activeRatioName,
									"hover:bg-neutral-800": ratio.name !== activeRatioName,
								}
							)}
							onClick={() => {
								changeRatio(ratio.name);
								setAddBorderAction(false);
								toast.success(`Kuvasuhde muutettu ${ratio.name}`, {
									duration: 650,
									id: "toast-ratio",
								});
							}}
						>
							<img src={ratio.icon} alt={ratio.name} />
							<span className="mt-1 w-full text-center">{ratio.name}</span>
						</button>
					);
				})}
			</div>
		</>
	);
}
