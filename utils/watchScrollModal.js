function watchScrollModal(isOpen) {
    console.log(isOpen)
    const fullpageExists = window.fullpage_api && document.querySelector('.fp-section');

    if (fullpageExists) {

        if (isOpen) {

            window.fullpage_api.setMouseWheelScrolling(false)
            window.fullpage_api.setAllowScrolling(false)
        } else {
            window.fullpage_api.setMouseWheelScrolling(true)
            window.fullpage_api.setAllowScrolling(true)
        }
    } else {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
    }
}

export default watchScrollModal