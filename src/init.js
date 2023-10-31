import { createApp } from "petite-vue"
import { Menu } from "./js/components/Menu"
import "./styles/main.scss"

createApp({
	$delimiters: ["[[", "]]"],
	// define your apps here
	Menu,
}).mount()
