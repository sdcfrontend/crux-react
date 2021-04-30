import Metric from './metric';

const Metrics = ({ metrics, chosenMetrics, metricsLoading }) => {
  const visibleMetrics = metrics?.filter(metric => chosenMetrics.includes(metric.name))

  return (
    metricsLoading
      ? <p>Loading...</p>
      : visibleMetrics?.map((metric, i) => (
          <Metric key={i} metric={metric}/>
        ))
  );
}

export default Metrics;