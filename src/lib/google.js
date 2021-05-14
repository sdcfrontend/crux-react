export const fetchFormFactorCrUXRecords = async (url, formFactor) => {
  const endpointUrl = 'https://chromeuxreport.googleapis.com/v1/records:queryRecord';
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({ url, formFactor })
  };

  const response = await fetch(`${endpointUrl}?key=${process.env.REACT_APP_CRUX_API_KEY}`, requestOptions);
  const data = await response.json();

  if (response.ok) return data;
  
  throw new Error(response.error);
}

export const fetchPageCrUXRecords = async (url, formFactors) => {
  try {
    const records = await Promise.all(
      formFactors.map(async formFactor => (
        fetchFormFactorCrUXRecords(url, formFactor)
      ))
    );

    return records
  }

  catch(error) {
    throw new Error(error);
  }
}