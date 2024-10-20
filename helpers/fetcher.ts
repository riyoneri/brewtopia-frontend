import { getSession } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface FetcherData {
  url: string;
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: FormData | string;
}

export const fetcher = async ({ url, body, method = "GET" }: FetcherData) => {
  try {
    let headers: Record<string, string> = {};
    const session = await getSession();

    typeof body === "string" && (headers["Content-Type"] = "application/json");

    session && (headers["Authorization"] = `Bearer ${session.user.token}`);

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

    throw {
      ...typedError,
      message: typedError.message,
      statusCode: typedError.statusCode || 500,
    };
  }
};
