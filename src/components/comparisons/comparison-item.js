import { useSelector, useDispatch } from 'react-redux';
import { selectComparison, updateComparison, deleteComparison } from '../../slices/comparisons';
import IconOverlay from '../ui/icon-overlay';

const ComparisonItem = ({ comparisonId }) => {
  const comparison = useSelector(selectComparison(comparisonId));

  const dispatch = useDispatch();

  const handleCheck = (e) => {
    dispatch(updateComparison({
      id: comparisonId,
      changes: {
        active: e.target.checked
      }
    }));
  }

  const handleDelete = (e) => {    
    e.preventDefault();

    dispatch(deleteComparison({
      comparisonId,
      metricsIds: comparison.metricsIds,
    }))
  }

  return (
    <div key={comparisonId} className="flex gap-s">
      <input
        type="checkbox"
        value={comparison.active}
        checked={comparison.active}
        onChange={handleCheck}
      />
      <p className="flex-grow pos-rel">
        {comparison.url}
        <IconOverlay icon="loading" iconAnimation="spin" showWhen={comparison.loading}/>
        <IconOverlay icon="error" iconFill="var(--alert)" showWhen={comparison.error}/>
      </p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default ComparisonItem;