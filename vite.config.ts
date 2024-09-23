import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
	base: "",
	plugins: [react()],
	resolve: {
		alias: [{ find: "@", replacement: "/src" }],
	},
	test: {
		environment: "jsdom",
	},
});
