function Menu(props) {
	return {
		siteHeader: null,
		menuOpen: false,
		submenuOpen: false,

		toggleMenu() {
			this.menuOpen = !this.menuOpen

			if (!this.menuOpen) {
				this.closeAllSubmenus()
			}
		},

		scrollEvent(el) {
			this.siteHeader = el

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

			if (this.submenuOpen && window.innerWidth >= 1024) {
				this.closeAllSubmenus()
			}

			if (!expanded) {
				this.submenuOpen = true
				const submenuHeight = submenu.scrollHeight
				submenu.style.height = submenuHeight + "px"
				submenu.setAttribute("aria-hidden", false)
			} else {
				this.submenuOpen = false
				submenu.style.height = 0
				submenu.setAttribute("aria-hidden", true)
			}

			el.setAttribute("aria-expanded", !expanded)
		},

		closeAllSubmenus() {
			const submenus = this.siteHeader.querySelectorAll(".site-header__submenu")
			const btnSubmenus = this.siteHeader.querySelectorAll(".btn-submenu")

			if (submenus.length === 0) return
			if (btnSubmenus.length === 0) return

			submenus.forEach((submenu) => {
				submenu.style.height = 0
				submenu.setAttribute("aria-hidden", true)
			})
			btnSubmenus.forEach((btnSubmenu) => {
				btnSubmenu.setAttribute("aria-expanded", false)
			})
		},
	}
}

export { Menu }
