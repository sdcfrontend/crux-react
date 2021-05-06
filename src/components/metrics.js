import { useSelector } from 'react-redux';
import { selectMetricsByRecordId } from "../slices/records";

import Metric from './metric';

const Metrics = () => {
  const metrics = useSelector(selectMetricsByRecordId('6093b41b0cd69b4b1b70a3be'))
  const selectedMetrics = useSelector(state => state.ui.selectedMetrics);

  const isLoadingRecords = useSelector(state => state.records.loading);

  const visibleMetrics = metrics?.filter(metric => selectedMetrics.includes(metric.name))

  return (
    isLoadingRecords
      ? <p>Loading...</p>
      : visibleMetrics?.map((metric, i) => (
          <Metric key={i} metric={metric}/>
        ))
  );
}

export default Metrics;