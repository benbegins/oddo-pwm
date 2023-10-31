function Menu(props) {
    return {
        isOpen: true,
        toggleMenu() {
            this.isOpen = !this.isOpen
        }
    }
  }


export { Menu }