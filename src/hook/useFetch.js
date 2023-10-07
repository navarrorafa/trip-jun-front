import { useEffect, useState } from "react";
import { dataFetch } from "../helpers/dataFetch";


export const useFetch = (url, method, body = {}) => {
  const [data, setData] = useState({});
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    setIsLoading(true);
    try {
      const newData = await dataFetch(url, method, body);
      if (newData.ok) {
        setData(newData.data);
      } else {
        throw new Error(newData.msg || "Ocurrió un error al cargar los datos.");
      }
    } catch (error) {
      setError(error.toString());
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();

  }, [url, method, body]);

  return { data, error, isLoading };
};
