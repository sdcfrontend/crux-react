import { memo } from 'react';
import { useSelector } from 'react-redux';

import Metric from './metric';

const Metrics = ({ metrics, showBadge }) => {
  const selectedMetrics = useSelector(state => state.ui.selectedMetrics);
  const visibleMetrics = metrics?.filter(metric => selectedMetrics?.includes(metric.name));

  return (
    visibleMetrics?.map(metric => (
      <Metric key={metric._id} metric={metric} showBadge={showBadge}/>
    ))
  );
}

export default memo(Metrics);