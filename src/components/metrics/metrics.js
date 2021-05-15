import { memo } from 'react';
import { useSelector } from 'react-redux';
import Metric from './metric';

const Metrics = ({ showBadge }) => {
  const selectedMetrics = useSelector(state => state.ui.selectedMetrics);

  return (
    selectedMetrics?.map(metric => (
      <Metric key={metric} metric={metric} showBadge={showBadge}/>
    ))
  );
}

export default memo(Metrics);