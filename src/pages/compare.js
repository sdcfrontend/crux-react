import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchComparisons } from '../slices/comparisons';
import Metrics from '../components/metrics';

const Compare = () => {
  const selectedSite = useSelector(state => state.ui.selectedSite);

  useEffect(() => {

  }, [selectedSite])

  return (
    <>
      <div className="ui-control-block flex flex-h-end" data-joined>
        <div className="ui-control text-s">
            <button className="ui-control-button ui-control--active">% in good category</button>
        </div>
        <div className="ui-control text-s">
            <button className="ui-control-button">Score at 75pc</button>
        </div>
      </div>

      <Metrics/>
    </>
  );
}

export default Compare;