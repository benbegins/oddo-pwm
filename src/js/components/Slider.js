import Swiper from "swiper"
import { Navigation } from "swiper/modules"
import "swiper/css"

function Slider(props) {
	return {
		slider: null,
		sliderContainer: null,
		sliderLength: 0,
		sliderIndex: 0,

		initSlider(el, alignArrows = false, alignText = false) {
			const sliderElement = el.querySelector(".swiper")
			const btnPrev = el.querySelector(".swiper-button-prev")
			const btnNext = el.querySelector(".swiper-button-next")

			const sliderOptions = {
				modules: [Navigation],
				navigation: {
					nextEl: btnNext,
					prevEl: btnPrev,
				},
				spaceBetween: 24,
				slidesPerView: "auto",
				breakpoints: {
					1024: {
						slidesPerView: props.slidesPerPage ? props.slidesPerPage : 4,
						spaceBetween: 32,
					},
				},
			}

			this.slider = new Swiper(sliderElement, sliderOptions)

			if (alignArrows && window.innerWidth >= 1024) {
				this.positionArrows(el)
			}
			if (alignText && window.innerWidth > 640) {
				setTimeout(() => {
					this.setHeight(el)
				}, 1000)
			}
			window.addEventListener("resize", () => {
				if (alignArrows && window.innerWidth >= 1024) {
					this.positionArrows(el)
				}
				if (alignText && window.innerWidth > 640) {
					this.setHeight(el)
				} else {
					this.resetHeight(el)
				}
			})
		},

		positionArrows(container) {
			const buttons = container.querySelectorAll(".swiper-button")
			const img = container.querySelector(".img-container")
			let imgHeight = img.offsetHeight
			buttons.forEach((button) => {
				button.style.top = `${imgHeight / 2}px`
			})
		},

		setHeight(container) {
			const titles = container.querySelectorAll(".slide-title")
			let height = 0
			titles.forEach((title) => {
				title.style.height = "auto"
				if (title.offsetHeight > height) {
					height = title.offsetHeight
				}
			})
			titles.forEach((title) => {
				title.style.height = `${height}px`
			})
		},

		resetHeight(container) {
			const titles = container.querySelectorAll(".slide-title")
			titles.forEach((title) => {
				title.style.height = "auto"
			})
		},
	}
}

export { Slider }
