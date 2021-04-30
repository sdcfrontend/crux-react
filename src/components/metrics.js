import Metric from './metric';

const Metrics = ({ metrics, chosenMetrics, metricsLoading }) => {
  const visibleMetrics = metrics?.filter(metric => chosenMetrics.includes(metric.name))

  return (
    visibleMetrics?.map((metric, i) => (
      <Metric key={i} metric={metric}/>
    ))
  );
}

export default Metrics;