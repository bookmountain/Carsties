import { getTokenWorkaround } from "@/app/actions/authActions";

// const baseUrl = process.env.API_URL;
const baseUrl = "http://localhost:6001/";

export type ApiError = { error: { status: number; message: string } };

async function get<T>(url: string): Promise<T | ApiError> {
    const requestOptions = {
        method: "GET",
        headers: await getHeaders()  // typo fixed: `header` → `headers`
    };

    const response = await fetch(baseUrl + url, requestOptions);
    return await handleResponse<T>(response);
}

async function post<T>(url: string, body: {}): Promise<T | ApiError> {
    const requestOptions = {
        method: "POST",
        headers: await getHeaders(),
        body: JSON.stringify(body)
    };
    const response = await fetch(baseUrl + url, requestOptions);
    return await handleResponse(response);
}

async function put(url: string, body: {}) {
    const requestOptions = {
        method: "PUT",
        headers: await getHeaders(),
        body: JSON.stringify(body)
    };
    const response = await fetch(baseUrl + url, requestOptions);
    return await handleResponse(response);
}

async function del(url: string) {
    const requestOptions = {
        method: "DELETE",
        headers: await getHeaders()
    };
    const response = await fetch(baseUrl + url, requestOptions);
    return await handleResponse(response);
}

async function getHeaders() {
    const token = await getTokenWorkaround();
    const headers = { "Content-type": "application/json" } as Record<string, string>;
    if (token) {
        headers.Authorization = "Bearer " + token.access_token;
    }
    return headers;
}


async function handleResponse<T>(response: Response): Promise<T | ApiError> {
    const text = await response.text();
    let data: unknown;

    try {
        data = JSON.parse(text);
    } catch (error) {
        data = text;
    }

    if (response.ok) {
        return (data as T) ?? (response.statusText as unknown as T);
    } else {
        return {
            error: {
                status: response.status,
                message: typeof data === "string" && data.length > 0 ? data : response.statusText
            }
        };
    }
}

export const fetchWrapper = {
    get,
    post,
    put,
    del
};
