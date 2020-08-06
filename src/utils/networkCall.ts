import { trackPromise } from "react-promise-tracker"
import ls from "./localStorage"
import showToast from "./toast"

type HTTP_VERBS = "POST" | "GET" | "PUT" | "PATCH" | "DELETE"

export const networkCall = async (pathWithParams: string, method: HTTP_VERBS, payload?: any) => {
    const BASE_API_URL = process.env.apiHost
    const authToken = ls.getFromLocalStorage("token", null)
    return trackPromise(
        fetch(`${BASE_API_URL}${pathWithParams}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=utf-8",
                Authorization: `Bearer ${authToken}`
            },
            method,
            body: JSON.stringify(payload)
        })
            .then(async (response) => {
                const resStatus = response.status
                let resBody
                try {
                    resBody = await response.json()
                } catch (e) {
                    resBody = { message: response.statusText }
                }
                if (pathWithParams !== "/auth/login" && pathWithParams !== "/users/new-user") {
                    if (resStatus == 401 || resStatus == 403) {
                        resBody.message = "Please re-login."
                    } else if (resStatus == 400) {
                        resBody.message = "Please fill all required fields properly"
                    } else if (resStatus == 500) {
                        if (navigator.onLine) {
                            resBody.message = "Something went wrong!"
                        } else {
                            resBody.message = "You are offline. Please connect to the internet."
                        }
                    } else if (resStatus == 201) {
                        resBody.message = "Saved!"
                    }
                    showToast(resStatus, resBody.message)
                }
                return { status: resStatus, body: resBody }
            })
            .catch((err) => {
                showToast(500, "Something went wrong!")
            })
    )
}
