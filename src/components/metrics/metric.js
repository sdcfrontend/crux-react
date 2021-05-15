import { useSelector } from 'react-redux';
import DataBadge from './data-badge';
import BarChart from '../charts/stacked-bar-chart'
import LineChart from '../charts/line-chart'

const Metric = ({ metric, showBadge }) => {
  const selectedFormFactor = useSelector(state => state.ui.selectedFormFactor);
  const nameToNiceName = {
    first_contentful_paint: 'First Contentful Paint',
    largest_contentful_paint: 'Largest Contentful Paint',
    first_input_delay: 'First Input Delay',
    cumulative_layout_shift: 'Cumulative Layout Shift',
  };

  const name = nameToNiceName[metric.name];
  // const score = Math.floor(metric[selectedFormFactor].histogram[0].density * 100);

  return (
    <>
    <div className="ui-panel-divider mar-b-l pad-b-xl">
      <h2 className="display-3 mar-b-xs">{name}</h2>

      <div className="text-supporting text-em mar-b-l">Lower scores best</div>
      <div className="flex gap-m">
        <div className="flex-grow">
          <BarChart sitesData={metric.pages}/>
          {/* <LineChart sitesData={[metric,metric,metric]} labels={['site1','site2','site3']}/> */}
        </div>
        {/* {showBadge && <DataBadge score={score}/>} */}
      </div>
    </div>
    </>
  );
}

export default Metric;