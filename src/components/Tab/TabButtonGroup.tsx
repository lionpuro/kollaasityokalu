import FiltersIcon from "@/components/Icon/FiltersIcon";
import RatioIcon from "@/components/Icon/RatioIcon";
import TemplateIcon from "@/components/Icon/TemplateIcon";
import TabButton from "@/components/Tab/TabButton";
import { TabItem } from "@/types";
import getAspectRatios from "@/utils/getAspectRatios";

export default function TabButtonGroup() {
	const tabs: TabItem[] = [
		{
			id: "kollaasi",
			icon: <TemplateIcon />,
		},
		{
			id: "kuvasuhde",
			icon: <RatioIcon />,
		},
		{
			id: "muokkaa",
			icon: <FiltersIcon />,
		},
	];

	return (
		<div
			data-testid="tabs"
			className="scrollbar-hide mx-2 grid grid-flow-col justify-stretch overflow-x-auto sm:mx-0 sm:shrink-0"
		>
			{tabs.map((tab) => {
				if (tab.id === "kuvasuhde" && getAspectRatios().length < 2) {
					return null;
				}
				return (
					<TabButton key={`tab-btn-${tab.id}`} id={tab.id} icon={tab.icon} />
				);
			})}
		</div>
	);
}
