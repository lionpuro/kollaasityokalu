import {
	changeTab,
	changeRatioByName,
	changeTemplateByIndex,
	setCanvas,
	setAddBorder,
	setBorderColor,
	setBorderThickness,
} from "@/redux/canvasSlice";
import { useAppDispatch } from "@/redux/hooks";
import {
	clearAllImages,
	clearSelectedImage,
	newImage,
	setSelectedImage,
	setImageFilterValue,
} from "@/redux/selectedImageSlice";
import type {
	ImageFilterUpdate,
	SelectedTabType,
	UploadedImage,
} from "@/types";
import type { Canvas } from "fabric";

function useTabAction() {
	const dispatch = useAppDispatch();
	const changeTabAction = (tab: SelectedTabType) => {
		dispatch(changeTab(tab));
	};
	return { changeTabAction };
}

function useRatioAction() {
	const dispatch = useAppDispatch();
	const changeRatio = (name: string) => {
		dispatch(changeRatioByName(name));
		dispatch(clearAllImages());
	};
	return { changeRatio };
}

function useTemplateAction() {
	const dispatch = useAppDispatch();
	const changeTemplate = (index: number) => {
		dispatch(changeTemplateByIndex(index));
		dispatch(clearAllImages());
	};
	return { changeTemplate };
}

function useImageFilterAction() {
	const dispatch = useAppDispatch();
	const changeFilterValue = (values: ImageFilterUpdate) => {
		dispatch(setImageFilterValue(values));
	};
	return { changeFilterValue };
}

function useCanvasAction() {
	const dispatch = useAppDispatch();
	const addImageAction = (imagePayload: UploadedImage) => {
		dispatch(newImage(imagePayload));
	};
	const clearSelectedImageAction = () => {
		dispatch(clearSelectedImage());
	};
	const setCanvasAction = (canvas: Canvas) => {
		dispatch(setCanvas(canvas));
	};
	const setSelectedImageAction = (id: string) => {
		dispatch(setSelectedImage(id));
	};
	// Add actions related to border settings
	const setAddBorderAction = (addBorder: boolean) => {
		dispatch(setAddBorder(addBorder));
	};
	const setBorderColorAction = (color: string) => {
		dispatch(setBorderColor(color));
	};
	const setBorderThicknessAction = (thickness: number) => {
		dispatch(setBorderThickness(thickness));
	};

	return {
		addImageAction,
		clearSelectedImageAction,
		setCanvasAction,
		setSelectedImageAction,
		// Return border settings actions
		setAddBorderAction,
		setBorderColorAction,
		setBorderThicknessAction,
	};
}

export {
	useTabAction,
	useRatioAction,
	useTemplateAction,
	useImageFilterAction,
	useCanvasAction,
};
