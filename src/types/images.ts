import type { FabricImage } from "fabric";

export type CustomImageObject = FabricImage & {
	id: string;
};

export interface UploadedImage {
	id: string;
	filters: {
		brightness: number;
		contrast: number;
		noise: number;
		saturation: number;
		vibrance: number;
		blur: number;
	};
}

export interface SelectedImageStateType {
	selectedImageIndex: number | null;
	images: UploadedImage[];
}

export interface ImageFilterUpdate {
	imageIndex: number;
	filterType: string;
	filterValue: number;
}
