import { useState, useEffect } from 'react';

export const useMetrics = (initialRequestBody) => {
  const [requestBody, setRequestBody] = useState(initialRequestBody);
  const [metricsLoading, setMetricsLoading] = useState(false);
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState(false);
  useEffect(() => {    
    const fetchMetrics = async () => {
      setMetricsLoading(true);
      
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
  
        setMetricsLoading(false);
      }
    
      catch(error) {
        setError(error);
      }
    }

    if (requestBody) fetchMetrics();
  }, [requestBody])

  return { metrics, metricsLoading, error, requestBody, setRequestBody };
}