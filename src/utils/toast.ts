import { toast, Slide } from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"

const toastOptions = {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    transition: Slide
}

const showToast = (status, message) => {
    if (status < 299) {
        toast.success(message, toastOptions)
    } else {
        toast.error(message, toastOptions)
    }
}

export default showToast
