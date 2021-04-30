import Metric from './metric';

const Metrics = ({ metrics, chosenMetrics, metricsLoading }) => {
  const visibleMetrics = metrics?.filter(metric => chosenMetrics.includes(metric.name))
console.log(metrics)
  return (
    metricsLoading
      ? <p>Loading...</p>
      : visibleMetrics?.map((metric, i) => (
          <Metric key={i} metric={metric}/>
        ))
  );
}

export default Metrics;