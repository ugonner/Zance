import { useState, useCallback } from "react";

const API_BASE_URL = "http://127.0.0.1:2500/api/v1";
// const API_BASE_URL = "https://zance-api.azurewebsites.net/api/v1";
// const API_BASE_URL = "https://dummyjson.com";

interface RequestOptions<T> {
  method: string;
  body?: T;
  token?: string;
}

const useApi = <RequestBody, ResponseBody>() => {
  const [data, setData] = useState<ResponseBody | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const request = useCallback(
    async (endpoint: string, options?: RequestOptions<RequestBody>) => {
      setLoading(true);
      setError(null);

      const { method, body, token } = options || {};

      try {
        const headers: HeadersInit = {
          "Content-Type": "application/json",
        };

        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
          method: method || "GET",
          headers,
          body: body ? JSON.stringify(body) : undefined,
        });

        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.message || response.statusText);
        }

        const result: ResponseBody = await response.json();
        setData(result);
        return result;
      } catch (err) {
        setError(err as Error);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const fetchData = useCallback(
    (endpoint: string, token?: string) => {
      return request(endpoint, { token });
    },
    [request],
  );

  const createData = useCallback(
    (endpoint: string, body: RequestBody, token?: string) => {
      return request(endpoint, { method: "POST", body, token });
    },
    [request],
  );

  const updateData = useCallback(
    (endpoint: string, body: RequestBody, token?: string) => {
      return request(endpoint, { method: "PUT", body, token });
    },
    [request],
  );

  const deleteData = useCallback(
    (endpoint: string, token?: string) => {
      return request(endpoint, { method: "DELETE", token });
    },
    [request],
  );

  return {
    data,
    loading,
    error,
    fetchData,
    createData,
    updateData,
    deleteData,
  };
};

export default useApi;
