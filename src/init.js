import "./styles/main.scss"

import { createApp } from "petite-vue"
import { Menu } from "./js/components/Menu"
import { VersionSelection } from "./js/components/VersionSelection"
import { Slider } from "./js/components/Slider"

createApp({
	$delimiters: ["[[", "]]"],
	Menu,
	VersionSelection,
	Slider,
}).mount()
