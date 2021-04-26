import Metric from './metric';

const Metrics = ({ name, metrics, chosenMetrics, metricsLoading }) => {

  const visibleMetrics = metrics?.filter(metric => chosenMetrics.includes(metric.name))

  return (
    <div className="flex-col gap-s">
      <h2>{name}</h2>
      <div className="flex-col gap-s">
        {metricsLoading
          ? <p>Loading...</p>
          : visibleMetrics?.map((metric, i) => (
            <Metric key={i} metric={metric}/>
          ))
        }
      </div>
    </div>
  );
}

export default Metrics;