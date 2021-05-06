import { useSelector } from 'react-redux';
import { selectMetricEntity } from "../slices/metrics";
import DataBadge from './data-badge';

const Metric = ({ metric }) => {
  const selectedDevice = useSelector(state => state.ui.selectedDevice);

  const nameToNiceName = {
    first_contentful_paint: 'First Contentful Paint',
    largest_contentful_paint: 'Largest Contentful Paint',
    first_input_delay: 'First Input Delay',
    cumulative_layout_shift: 'Cumulative Layout Shift',
  };

  const name = nameToNiceName[metric.name];
  const score = Math.floor(metric[selectedDevice].histogram[0].density * 100);

  return (
    <>
    <div className="ui-panel-divider pad-b-xl">
      <h2 className="display-3 mar-b-xs">{name}</h2>

      <div className="text-supporting text-em mar-b-l">Lower scores best</div>
      <div className="flex gap-m">
        <div className="flex-grow">GRAPH</div>
        <DataBadge score={score}/>
      </div>
    </div>
    </>
  );
}

export default Metric;