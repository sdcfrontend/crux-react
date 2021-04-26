import { useState, useEffect } from 'react';

export const useMetrics = () => {
  const [requestBody, setRequestBody] = useState(false);
  const [loading, setLoading] = useState(false);
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState(false);
  
  useEffect(() => {    
    const fetchMetrics = async () => {
      setLoading(true);

      try {
        const endpointUrl = 'https://chromeuxreport.googleapis.com/v1/records:queryRecord';
        const requestOptions = {
          method: 'POST',
          body: JSON.stringify(requestBody)
        };

        const response = await fetch(`${endpointUrl}?key=${process.env.REACT_APP_CRUX_API_KEY}`, requestOptions);
        const data = await response.json();
  
        setMetrics(Object.entries(data.record.metrics).map(
          metric => ({ ...metric[1], name: metric[0] })
        ));
  
        setLoading(false);
      }
    
      catch(error) {
        setError(error);
      }
    }

    fetchMetrics();
  }, [requestBody])

  return { metrics, loading, error, requestBody, setRequestBody };
}