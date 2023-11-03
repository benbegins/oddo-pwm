import "./styles/main.scss"

import { createApp } from "petite-vue"
import { Menu } from "./js/components/Menu"
import { VersionSelection } from "./js/components/VersionSelection"

createApp({
	$delimiters: ["[[", "]]"],
	// define your apps here
	Menu,
	VersionSelection,
}).mount()
