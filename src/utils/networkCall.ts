const BASE_API_URL = process.env.apiHost

type HTTP_VERBS = "POST" | "GET" | "PUT" | "PATCH" | "DELETE"

export const networkCall = async (
    pathWithParams: string,
    method: HTTP_VERBS,
    payload: BodyInit
): Promise<Record<string, unknown>> => {
    return fetch(`${BASE_API_URL}/${pathWithParams}`, {
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        method,
        body: payload
    })
        .then((response) => response.json())
        .catch(console.error)
}
