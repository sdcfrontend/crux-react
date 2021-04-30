import { useState, useEffect } from 'react';

export const useApi = (initialEndpoint, initialOptions) => {
  const [endpoint, setEndpoint] = useState(initialEndpoint);
  const [options, setOptions] = useState(initialOptions);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  
  useEffect(() => {    
    const fetchData = async () => {
      setLoading(true);

      try {
        const defaultOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        };

        const requestOptions = {
          ...defaultOptions,
          options
        }

        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/${endpoint}`, requestOptions);
  
        setData(await response.json());
  
        setLoading(false);
      }
    
      catch(error) {
        setError(error);
      }
    }

    fetchData();
  }, [endpoint, options])

  return { data, loading, error, endpoint, options, setEndpoint, setOptions };
}