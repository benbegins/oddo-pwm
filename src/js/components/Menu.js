function Menu(props) {
	return {
		siteHeader: props,
		menuOpen: false,

		toggleMenu() {
			this.menuOpen = !this.menuOpen
		},

		scrollEvent(el) {
			window.addEventListener("scroll", () => {
				if (window.scrollY > 50) {
					el.classList.add("is-scrolling")
				} else {
					el.classList.remove("is-scrolling")
				}
			})
		},

		toggleSubmenu(el) {
			const submenu = el.nextElementSibling
			const expanded = el.getAttribute("aria-expanded") === "true" || false

			if (!expanded) {
				const submenuHeight = submenu.scrollHeight
				submenu.style.height = submenuHeight + "px"
			} else {
				submenu.style.height = 0
			}

			el.setAttribute("aria-expanded", !expanded)
		},

		closeAllSubmenus() {
			const submenus = props.querySelectorAll(".submenu")
			const btnSubmenus = props.querySelectorAll(".btn-submenu")
			submenus.forEach((submenu) => {
				submenu.style.height = 0
			})
			btnSubmenus.forEach((btnSubmenu) => {
				btnSubmenu.setAttribute("aria-expanded", false)
			})
		},
	}
}

export { Menu }
