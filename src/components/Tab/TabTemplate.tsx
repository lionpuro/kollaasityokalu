import { COLLAGE_TEMPLATES } from "@/constants/canvasConfig";
import { useTemplateAction, useCanvasAction } from "@/hooks/useReduxAction";
import { useCanvasConfigData } from "@/hooks/useReduxData";
import clsx from "clsx";
import toast from "react-hot-toast";

export default function TabTemplate() {
	const { activeTemplateIndex } = useCanvasConfigData();
	const { changeTemplate } = useTemplateAction();
	const { setAddBorderAction } = useCanvasAction();

	return (
		<>
			<div className="flex flex-nowrap place-items-start text-white sm:flex-wrap">
				{COLLAGE_TEMPLATES.map((template, index) => {
					return (
						<button
							key={`template-${index}`}
							aria-label={`vaihda kollaasi ${template.name}`}
							className={clsx(
								"cursor-pointer rounded transition-colors",
								"flex flex-col items-center justify-center text-center",
								"mx-1 h-20 w-20",
								"md:w-[calc(50%-8px)]",
								"sm:mb-2 sm:w-full",
								{
									"bg-neutral-800": index === activeTemplateIndex,
									"hover:bg-neutral-800": index !== activeTemplateIndex,
								}
							)}
							onClick={() => {
								changeTemplate(index);
								setAddBorderAction(false);
								toast.success(`Kollaasi muutettu`, {
									duration: 650,
									id: "toast-template",
								});
							}}
						>
							{<img src={template.icon} alt={template.name} />}
						</button>
					);
				})}
			</div>
		</>
	);
}
