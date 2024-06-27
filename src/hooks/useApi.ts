import { useState, useCallback } from "react";

// const API_BASE_URL = "https://zance-api.azurewebsites.net/api/v1";
const API_BASE_URL = "https://dummyjson.com";

interface RequestOptions<T> {
  method: string;
  body?: T;
}

const useApi = <RequestBody, ResponseBody>() => {
  const [data, setData] = useState<ResponseBody | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const request = useCallback(
    async (endpoint: string, options?: RequestOptions<RequestBody>) => {
      setLoading(true);
      setError(null);

      const { method, body } = options || {};

      try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
          method: method || "GET",
          headers: {
            "Content-Type": "application/json",
          },
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
    (endpoint: string) => {
      return request(endpoint);
    },
    [request],
  );

  const createData = useCallback(
    (endpoint: string, body: RequestBody) => {
      return request(endpoint, { method: "POST", body });
    },
    [request],
  );

  const updateData = useCallback(
    (endpoint: string, body: RequestBody) => {
      return request(endpoint, { method: "PUT", body });
    },
    [request],
  );

  const deleteData = useCallback(
    (endpoint: string) => {
      return request(endpoint, { method: "DELETE" });
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
