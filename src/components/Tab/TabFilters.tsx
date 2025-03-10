import FilterControl from "@/components/Filter/FilterSliderInput";
import { filters } from "@/constants/filters";
import { useCanvasAction } from "@/hooks/useReduxAction";
import { useCanvasImageData } from "@/hooks/useReduxData";
import { selectBorderSettings } from "@/redux/canvasSlice";
import type { FilterControlType, FilterIdType } from "@/types";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function TabFilters() {
	const [isMobile, setIsMobile] = useState(false);
	const [activeFilter, setActiveFilter] = useState<FilterIdType | null>(null);
	const [borderControlOn, setBorderControlOn] = useState(false);
	const { uploadCount, maxImageUploads } = useCanvasImageData();

	const { setAddBorderAction, setBorderThicknessAction } = useCanvasAction(); // Destructure the border settings actions

	const borderSettings = useSelector(selectBorderSettings);

	useEffect(() => {
		// Set default border to false
		setAddBorderAction(borderSettings.addBorder);
		// Set default thickness to the smallest value
		setBorderThicknessAction(borderSettings.borderThickness);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleOutlineChange = (event: { target: { checked: boolean } }) => {
		const addOutlineValue = event.target.checked;
		/* setAddOutline(addOutlineValue); */
		setAddBorderAction(addOutlineValue); // Dispatch action to update addOutline state in Redux store
	};

	const handleThicknessChange = (event: { target: { value: string } }) => {
		const thickness = event.target.value;
		setBorderThicknessAction(Number(thickness)); // Dispatch action to update thickness in Redux store
	};

	useEffect(() => {
		const handleResize = () => {
			const isMobileView = window.matchMedia("(max-width: 640px)").matches;
			setIsMobile(isMobileView);
		};

		handleResize();

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	if (isMobile) {
		return (
			<div>
				<div
					className={clsx({
						"w-full": true,
						"flex flex-nowrap": isMobile,
						"px-2": !isMobile,
					})}
				>
					{!borderControlOn && !activeFilter ? (
						<button
							onClick={() => setBorderControlOn(true)}
							className={clsx(
								"cursor-pointer transition-colors",
								"mx-1 h-20 min-w-20 px-2",
								"flex flex-col items-center justify-center text-center",
								"rounded hover:bg-neutral-800"
							)}
							disabled={uploadCount !== maxImageUploads}
						>
							{uploadCount !== maxImageUploads ||
							borderSettings.addBorder === false ? (
								<span> - </span>
							) : (
								<span>{borderSettings.borderThickness}</span>
							)}
							<h3 className={`w-full text-center text-sm font-medium`}>
								{/*className={`w-full text-center text-sm font-medium ${
									uploadCount !== maxImageUploads ? "text-gray-500" : ""
								} `}*/}
								Reuna
							</h3>
						</button>
					) : (
						borderControlOn === true && (
							<div className="flex w-full items-center">
								<button
									onClick={() => setBorderControlOn(false)}
									className={clsx(
										"cursor-pointer",
										"mx-1 h-20 w-16 px-1",
										"flex flex-col items-center justify-center",
										"rounded hover:bg-neutral-800"
									)}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="32"
										height="32"
										viewBox="0 0 15 15"
									>
										<path
											fill="currentColor"
											fillRule="evenodd"
											d="M8.842 3.135a.5.5 0 0 1 .023.707L5.435 7.5l3.43 3.658a.5.5 0 0 1-.73.684l-3.75-4a.5.5 0 0 1 0-.684l3.75-4a.5.5 0 0 1 .707-.023Z"
											clipRule="evenodd"
										/>
									</svg>
									<span className="text-sm">Takaisin</span>
								</button>
								<div className="mx-3 grow">
									<div className="flex flex-row">
										<div className="flex flex-col">
											<h3 className="w-1/2 text-left font-medium">
												Lisää reuna
											</h3>
											<input
												type="checkbox"
												checked={borderSettings.addBorder}
												onChange={handleOutlineChange}
												style={{
													transform: "scale(1.5)",
													marginTop: "5px",
													marginRight: "40px",
												}}
											/>
										</div>
										{borderSettings.addBorder && (
											<div className="mx-3 grow">
												<div className="flex w-full flex-row items-center rounded transition-colors">
													<h3 className="w-1/2 text-left font-medium">
														Reunan paksuus
													</h3>
													<span className="w-1/2 text-right">
														{borderSettings.borderThickness}
													</span>
												</div>
												<div className="flex w-full items-center justify-center">
													<input
														id={"borderThicknessSlider"}
														type="range"
														min="1"
														max="20"
														value={borderSettings.borderThickness} // Set the value attribute to the thickness state
														onChange={handleThicknessChange}
														className="my-2 w-full"
													/>
												</div>
											</div>
										)}
									</div>
								</div>
							</div>
						)
					)}
					{!borderControlOn &&
						filters.map((filter: FilterControlType, i: number) => {
							return (
								<FilterControl
									key={`filter-${i}`}
									id={filter.id}
									min={filter.min}
									max={filter.max}
									step={filter.step}
									newFilter={filter.newFilter}
									isMobile={isMobile}
									activeFilter={activeFilter}
									setActiveFilter={setActiveFilter}
								/>
							);
						})}
				</div>
			</div>
		);
	}

	return (
		<div>
			<div className="border-b border-neutral-800 px-2 py-4">
				<div className={"mb-4"}>
					<input
						type="checkbox"
						checked={borderSettings.addBorder}
						onChange={handleOutlineChange}
						style={{ transform: "scale(1.5)", marginLeft: "5px" }}
						disabled={uploadCount !== maxImageUploads}
					/>
					<label
						className={`w-1/2 text-left font-medium ${
							uploadCount !== maxImageUploads ? "text-gray-500" : ""
						} ml-2 `}
					>
						Lisää reuna
					</label>
				</div>
				{borderSettings.addBorder && (
					<div>
						<div className="flex w-full flex-row items-center rounded transition-colors">
							<h3 className="w-1/2 text-left font-medium">Reunan paksuus</h3>
							<span className="w-1/2 text-right">
								{borderSettings.borderThickness}
							</span>
						</div>
						<div className="flex w-full items-center justify-center">
							{
								<input
									id={"borderThicknessSlider"}
									type="range"
									min="1"
									max="20"
									value={borderSettings.borderThickness} // Set the value attribute to the thickness state
									onChange={handleThicknessChange}
									className="my-2 w-full"
								/>
							}
						</div>
					</div>
				)}
			</div>

			<div
				className={clsx({
					"w-full": true,
					"flex flex-nowrap": isMobile,
					"px-2": !isMobile,
				})}
			>
				{filters.map((filter: FilterControlType, i: number) => {
					return (
						<FilterControl
							key={`filter-${i}`}
							id={filter.id}
							min={filter.min}
							max={filter.max}
							step={filter.step}
							newFilter={filter.newFilter}
							isMobile={isMobile}
							activeFilter={activeFilter}
							setActiveFilter={setActiveFilter}
						/>
					);
				})}
			</div>
		</div>
	);
}
