import { defineConfig } from "vite"
import { resolve } from "path"

export default defineConfig({
	esbuild: {
		minify: true,
	},
	build: {
		target: "modules",
		lib: {
			entry: resolve(__dirname, "init.js"),
			name: "bemy",
		},
		outDir: resolve(__dirname, "../dist"),
	},
})
