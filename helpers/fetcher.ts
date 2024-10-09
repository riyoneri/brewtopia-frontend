const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface FetcherData {
  url: string;
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: FormData | string;
}

export const fetcher = async ({ url, body, method = "GET" }: FetcherData) => {
  try {
    let headers: Record<string, string> = {};
    const token = localStorage.getItem("_o")?.replaceAll(/"/g, "");

    typeof body === "string" && (headers["Content-Type"] = "application/json");

    token && (headers["Authorization"] = `Bearer ${token}`);

    const response = await fetch(`${API_URL}${url}`, {
      method,
      headers,
      body,
    });

    const data = await response.json();

    if (!response.ok) {
      throw {
        message: data.errors ? undefined : data.message,
        validationErrors: data.errors,
        statusCode: response.status,
      };
    }

    return data;
  } catch (error) {
    const typedError = error as FetcherResponse;

    // if (typedError.status === 401 && logout) logout();

    throw {
      ...typedError,
      errorMessage: typedError.message,
      statusCode: typedError.statusCode || 500,
    };
  }
};
