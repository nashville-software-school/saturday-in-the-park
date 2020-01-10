export default {

  isOpen: false,

  toggleDialog (visible, selector) {

    if (visible) {
      document.querySelector(`${selector}`).close()
      this.isOpen = false
    } else {
      document.querySelector(`${selector}`).show()
      this.open = true
    }
  }

}
