import { getTokenWorkaround } from "@/app/actions/authActions";

const baseUrl = process.env.API_URL;

export class ApiError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.name = "ApiError";
        this.status = status;
    }
}

async function get<T>(url: string): Promise<T> {
    const requestOptions = {
        method: "GET",
        headers: await getHeaders()  // typo fixed: `header` → `headers`
    };

    const response = await fetch(baseUrl + url, requestOptions);
    return await handleResponse<T>(response);
}

async function post<T>(url: string, body: {}): Promise<T> {
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

async function del<T>(url: string): Promise<T> {
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


async function handleResponse<T>(response: Response): Promise<T> {
    const text = await response.text();
    let data: unknown;

    try {
        data = JSON.parse(text);
    } catch {
        data = text;
    }

    if (response.ok) {
        return data as T;
    } else {
        const message = typeof data === "string" && data.length > 0
            ? data
            : (data as any)?.message || response.statusText;

        throw new ApiError(message, response.status);
    }
}

export const fetchWrapper = {
    get,
    post,
    put,
    del
};
