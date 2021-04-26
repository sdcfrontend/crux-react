import { useState, useEffect } from 'react';
import { useMetrics } from '../hooks/use-metrics';

const ComparisonPicker = ({ isComparing, setIsComparing, setComparisonMetrics, setComparisonMetricsLoading, currentDevice }) => {
  const [inputText, setInputText] = useState('');

  const { metrics, loading, requestBody, setRequestBody } = useMetrics(null);

  useEffect(() => {
    if (!isComparing) return;

    setComparisonMetrics(metrics);
  }, [metrics]);

  useEffect(() => {
    if (!isComparing) return;

    setComparisonMetricsLoading(loading);
  }, [loading]);

  useEffect(() => {
    setRequestBody({
      ...requestBody,
      formFactor: currentDevice
    });

  }, [currentDevice]);

  const handleInput = (e) => {
    setInputText(e.target.value);
  }

  const handleClick = (e) => {    
    e.preventDefault();

    if (inputText === '') return;

    
    setIsComparing(true);
    setRequestBody({
      ...requestBody,
      origin: inputText,
      formFactor: currentDevice
    });
  }

  return (
    <form className="ui-control ui-control--tight">
      <input className="ui-control-input" type="text" onChange={handleInput}/>
      <button className="ui-control-button" onClick={handleClick}>Go</button>
    </form>
  );
}

export default ComparisonPicker;