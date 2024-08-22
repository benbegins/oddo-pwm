function VersionSelection() {
	return {
		popinDisplayed: false,
		countrySelectOpen: false,
		languageSelectOpen: false,

		languages: {
			fr: "Français",
			en: "English",
			de: "Deutsch",
		},
		versionsAvailable: {
			france: ["en", "fr"],
			germany: ["de", "en"],
			switzerland: ["de", "en", "fr"],
		},
		languagesAvailable: [],

		versionSelected: null,
		versionSelectedLabel: null,
		languageSelected: null,
		languageSelectedLabel: null,

		initVersionSelection() {
			setTimeout(() => {
				// Get the version selected in local storage
				const versionSelected = sessionStorage.getItem("version")
				// If a version is selected
				if (!versionSelected) {
					// Display the popin
					this.openPopin()
				}
			}, 1000)
		},

		openPopin() {
			const body = document.querySelector("body")
			body.style.overflow = "hidden"
			this.popinDisplayed = true
		},

		toggleSelectVersion() {
			this.countrySelectOpen = !this.countrySelectOpen
			this.languageSelectOpen = false
		},

		toggleSelectLanguage() {
			this.languageSelectOpen = !this.languageSelectOpen
			this.countrySelectOpen = false
		},

		selectVersion(el) {
			// Close country select
			this.countrySelectOpen = false
			// Reset language selected
			this.languageSelected = null
			this.languageSelectedLabel = null
			// Set version selected
			this.versionSelected = el.dataset.version
			this.versionSelectedLabel = el.innerText

			// Check if version selected is available in versionsAvailable
			if (this.versionsAvailable[this.versionSelected]) {
				// Get the language selected for this country
				this.languagesAvailable = this.versionsAvailable[this.versionSelected]
			}
		},

		selectLanguage(el) {
			// Close language select
			this.languageSelectOpen = false
			// Set language selected
			this.languageSelected = el.dataset.language
			this.languageSelectedLabel = el.innerText

			this.apiRequest()
		},

		apiRequest() {
			const endpoint = `/wp-json/bemy/v1/version?version=${this.versionSelected}&lang=${this.languageSelected}`

			axios
				.get(endpoint)
				.then((response) => {
					if (response.data.success) {
						// Set local storage to remember the version selected
						sessionStorage.setItem("version", this.versionSelected)
						// Redirect to the home page
						window.location.href = response.data.home_url
					}
				})
				.catch((error) => {
					console.log(error)
				})
		},

		homepage(homeUrls) {
			const versionSelected = sessionStorage.getItem("version")

			if (versionSelected && homeUrls) {
				const urls = homeUrls.split(",")
				let redirectUrl = urls[0]

				switch (versionSelected) {
					case "france":
						redirectUrl = urls[0]
						break

					case "germany":
						redirectUrl = urls[1]
						break

					case "switzerland":
						redirectUrl = urls[2]
						break

					default:
						break
				}

				setTimeout(() => {
					window.location.href = redirectUrl
				}, 250)
			}
		},
	}
}

export { VersionSelection }
