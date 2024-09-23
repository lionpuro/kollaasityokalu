import TabFilters from "@/components/Tab/TabFilters";
import TabRatio from "@/components/Tab/TabRatio";
import TabTemplate from "@/components/Tab/TabTemplate";
import { useTabData } from "@/hooks/useReduxData";
import clsx from "clsx";

export default function TabContent() {
	const { activeTab } = useTabData();

	return (
		<div
			data-testid="tabContent"
			className={clsx([
				"scrollbar-hide bg-neutral-900",
				"mx-2 h-28 p-2",
				"flex items-center overflow-x-auto overflow-y-hidden",
				"sm:mx-0 sm:block sm:h-auto sm:overflow-y-auto sm:overflow-x-hidden",
			])}
		>
			{activeTab === "kollaasi" && <TabTemplate />}
			{activeTab === "kuvasuhde" && <TabRatio />}
			{activeTab === "muokkaa" && <TabFilters />}
		</div>
	);
}
