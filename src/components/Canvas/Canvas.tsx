import CanvasFooter from "@/components/Canvas/CanvasFooter";
import { OBJECT_LOCKED } from "@/constants/canvasConfig";
import { useCanvasAction, useTabAction } from "@/hooks/useReduxAction";
import { useCanvasConfigData } from "@/hooks/useReduxData";
import { selectBorderSettings } from "@/redux/canvasSlice";
import { CustomImageObject } from "@/types";
import findAspectRatio from "@/utils/findAspectRatio";
import * as fabric from "fabric";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

// Import the selector for border settings

export default function Canvas() {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const wrapperRef = useRef<HTMLDivElement | null>(null);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const prevBorderSettings = useRef<any>(null); // Store previous border settings
	const borderRefs = useRef<fabric.Rect[]>([]);
	const [canvasState, setCanvasState] = useState<fabric.Canvas | null>(null);

	// Get necessary Redux data via hooks
	const { activeTemplateIndex, activeRatioName, activeTemplate } =
		useCanvasConfigData();

	const {
		addImageAction,
		clearSelectedImageAction,
		setCanvasAction,
		setSelectedImageAction,
	} = useCanvasAction();

	const { changeTabAction } = useTabAction();

	// Get border settings from Redux store
	const borderSettings = useSelector(selectBorderSettings);

	// Canvas initialization
	useEffect(() => {
		if (!canvasRef.current || !wrapperRef.current) {
			return;
		}
		// 0. Calculate canvas ratio by initial client width
		const panelWidth = 640;
		const ratio = findAspectRatio(activeRatioName).canvas(panelWidth);

		// 1. Setup canvas
		const canvas = new fabric.Canvas(canvasRef.current, {
			backgroundColor: "#1a1a1a",
			width: ratio.width,
			height: ratio.height,
			selection: false,
			controlsAboveOverlay: false,
			allowTouchScrolling: true,
			imageSmoothingEnabled: false,
		});

		if (wrapperRef.current.clientWidth < panelWidth) {
			const scaledRatio = findAspectRatio(activeRatioName).canvas(
				wrapperRef.current.clientWidth
			);
			canvas.setDimensions(
				{ width: scaledRatio.width - 16, height: scaledRatio.height - 16 },
				{ cssOnly: true }
			);
		}

		canvas.preserveObjectStacking = true;

		// 1.1 Clone canvas
		setCanvasAction(canvas);
		setCanvasState(canvas);

		// 2. Setup objects & its properties
		activeTemplate.config.forEach((config) => {
			const PROPERTIES = config.rectFabric(ratio.height, ratio.width);
			const cell = new fabric.Rect(PROPERTIES).set(OBJECT_LOCKED);

			// 3. Define image upload event handler
			const handleImageUpload = (selectedCell: fabric.Rect) => {
				const input = inputRef.current;
				if (!input) return;

				input.onchange = async (event) => {
					const target = event.target as HTMLInputElement;
					const file = target.files && target.files[0];
					if (!file) return;

					// Load uploaded file as Base64
					const reader = new FileReader();
					reader.readAsDataURL(file);
					reader.onload = (e) => {
						const dataUrl = e.target?.result as string;
						// Load image as fabric image
						const addImage = async (imageBase64: string) => {
							const img = await fabric.Image.fromURL(imageBase64);
							const imgId = `img_${new Date().getTime()}`;

							// Set position to selected cell
							img.set({
								id: imgId,
								left: selectedCell.left,
								top: selectedCell.top,
								selectable: true,
								hasControls: true,
								clipPath: selectedCell,
								perPixelTargetFind: true,
							}) as CustomImageObject;

							// Scale accordingly to look good
							if (config.scaleTo === "width") {
								img.scaleToWidth(selectedCell.width + 1);
							} else if (config.scaleTo === "height") {
								img.scaleToHeight(selectedCell.height + 1);
							}

							// Save image in redux
							addImageAction({
								id: imgId,
								filters: {
									brightness: 0,
									contrast: 0,
									noise: 0,
									saturation: 0,
									vibrance: 0,
									blur: 0,
								},
							});

							canvas.add(img);
							canvas.setActiveObject(img);
						};
						addImage(dataUrl);
					};

					// Render in canvas
					canvas.remove(selectedCell);
					canvas.renderAll();
					toast.success("Kuva lisätty onnistuneesti", {
						id: "toast-uploaded",
					});

					// Switch to More tab, to show controls on active object
					changeTabAction("muokkaa");
				};

				input.click();
				input.value = "";
			};

			// 4. Attach event handler
			cell.on("mouseup", () => {
				handleImageUpload(cell);
			});

			// 5. Render
			canvas.add(cell);
		});

		// 6. Render all looped objects
		canvas.renderAll();

		// 7. Attach event handler on object selection
		const handleImageSelect = (selected: CustomImageObject) => {
			// Change tab on select
			changeTabAction("muokkaa");

			// Set selected image
			setSelectedImageAction(selected.id);
		};

		canvas.on("selection:created", ({ selected }) => {
			handleImageSelect(selected[0] as CustomImageObject);
		});

		canvas.on("selection:updated", ({ selected }) => {
			handleImageSelect(selected[0] as CustomImageObject);
		});

		canvas.on("selection:cleared", () => {
			clearSelectedImageAction();
		});

		// 8. Clean up the canvas when the component unmounts
		return () => {
			canvas.dispose();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeRatioName, activeTemplateIndex]);

	// Update canvas properties when borderSettings change
	useEffect(() => {
		if (!canvasState || !prevBorderSettings) {
			prevBorderSettings.current = borderSettings;
			return;
		}
		// Compare current and previous border settings
		const prevSettings = prevBorderSettings.current;
		if (
			prevSettings.addBorder !== borderSettings.addBorder ||
			prevSettings.borderColor !== borderSettings.borderColor ||
			prevSettings.borderThickness !== borderSettings.borderThickness
		) {
			// Update canvas properties based on border settings
			if (wrapperRef.current) {
				const panelWidth = 640;
				const ratio = findAspectRatio(activeRatioName).canvas(panelWidth);

				// Loop through stored border references and remove them from the canvas
				borderRefs.current.forEach((border) => canvasState.remove(border));
				// Clear the stored references
				borderRefs.current = [];

				const borderSize = borderSettings.borderThickness * 2;
				if (borderSettings.addBorder) {
					const bWidth = borderSize;
					const outline = new fabric.Rect({
						top: 0,
						left: 0,
						width: canvasState.width - bWidth * 2,
						height: canvasState.height - bWidth * 2,
						fill: "transparent",
						stroke: "white",
						strokeWidth: borderSize * 2,
						selectable: false, // Make it not selectable
						evented: false, // Make it not trigger events
						strokeUniform: true,
						objectCaching: false,
					});
					canvasState.add(outline);
					borderRefs.current.push(outline); // Store reference to the added border
				}
				activeTemplate.config.forEach((config) => {
					const PROPERTIES = config.rectFabric(ratio.height, ratio.width);

					if (borderSettings.addBorder) {
						const border = new fabric.Rect({
							...PROPERTIES,
							width: PROPERTIES.width - borderSize,
							height: PROPERTIES.height - borderSize,
							stroke: "white", // Set the border color
							strokeWidth: borderSize,
							selectable: false, // Make it not selectable
							evented: false, // Make it not trigger events
							strokeUniform: true,
							fill: "transparent",
							objectCaching: false,
						});
						canvasState.add(border);
						console.log(PROPERTIES.width, PROPERTIES.height);
						borderRefs.current.push(border); // Store reference to the added border
					} else {
						// Loop through stored border references and remove them from the canvas
						borderRefs.current.forEach((border) => canvasState.remove(border));

						borderRefs.current = [];
					}
				});
			}
			// Redraw canvas
			canvasState.renderAll();
			// Update previous border settings
			prevBorderSettings.current = borderSettings;
		}
	}, [canvasState, borderSettings, activeRatioName, activeTemplate.config]);

	return (
		<div
			ref={wrapperRef}
			className="flex-col justify-between sm:flex sm:h-full"
		>
			<div className="flex items-start justify-center py-2 sm:py-8">
				<canvas ref={canvasRef} />
			</div>
			<div className="hidden">
				<input ref={inputRef} type="file" accept="image/*" className="hidden" />
			</div>
			<CanvasFooter />
		</div>
	);
}
