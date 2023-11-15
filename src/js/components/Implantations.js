function Implantations() {
	return {
		showFrance: false,
		showGermany: false,
		showSwitzerland: false,

		toggleSelect(el) {
			const country = el.dataset.country

			switch (country) {
				case "france":
					if (this.showFrance) {
						this.showFrance = false
					} else {
						this.closeAll()
						this.showFrance = true
					}
					break

				case "germany":
					if (this.showGermany) {
						this.showGermany = false
					} else {
						this.closeAll()
						this.showGermany = true
					}
					break

				case "switzerland":
					if (this.showSwitzerland) {
						this.showSwitzerland = false
					} else {
						this.closeAll()
						this.showSwitzerland = true
					}
					break

				default:
					break
			}

			this.updateBtns()
		},

		closeAll() {
			this.showFrance = false
			this.showGermany = false
			this.showSwitzerland = false
		},

		updateBtns() {
			const buttons = document.querySelectorAll(".btn-implantations, .btn-pointer")
			buttons.forEach((button) => {
				button.classList.remove("active")

				if (this.showFrance && button.dataset.country === "france") {
					button.classList.add("active")
				}

				if (this.showGermany && button.dataset.country === "germany") {
					button.classList.add("active")
				}

				if (this.showSwitzerland && button.dataset.country === "switzerland") {
					button.classList.add("active")
				}
			})
		},
	}
}

export { Implantations }
