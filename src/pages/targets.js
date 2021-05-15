import MetricsTypePicker from '../components/metrics/metrics-type-picker';
import Metrics from '../components/metrics/metrics';

const Targets = () => {
  return (
    <>
      <MetricsTypePicker/>
      <Metrics showBadge={true}/>
    </>
  );
}

export default Targets;