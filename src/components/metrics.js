import { useSelector } from 'react-redux';
import { selectRecordIds, selectMetricsByRecordId } from "../slices/records";

import Metric from './metric';

const Metrics = () => {
  const selectedMetrics = useSelector(state => state.ui.selectedMetrics);
  const recordIds = useSelector(selectRecordIds);
  const metrics = useSelector(selectMetricsByRecordId(recordIds[0]))
  const visibleMetrics = metrics?.filter(metric => selectedMetrics.includes(metric.name));

  return (
    visibleMetrics?.map(metric => (
      <Metric key={metric._id} metric={metric}/>
    ))
  );
}

export default Metrics;