//import DownloadButton from "@/components/Button/DownloadButton";
import UploadDropboxButton from "@/components/Button/UploadDropboxButton";
import TabButtonGroup from "@/components/Tab/TabButtonGroup";
import TabContent from "@/components/Tab/TabContent";

export default function EditingPanel() {
	return (
		<>
			<TabButtonGroup />

			<TabContent />

			<UploadDropboxButton />
		</>
	);
}
