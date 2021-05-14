import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectActiveComparisons, fetchComparisonMetrics } from '../../slices/comparisons';
import ComparisonList from './comparison-list';
import ComparisonForm from './comparison-form';

const ComparisonControls = () => {
  const selectedPage = useSelector(state => state.ui.selectedPage);
  const activeComparisons = useSelector(selectActiveComparisons(selectedPage));
  const [count, setCount] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    if (count > 1) return;
    activeComparisons.filter(comparison => !comparison.stored && !comparison.error).map(comparison => (
      dispatch(fetchComparisonMetrics(comparison))
    ));
    setCount(count + 1)
  }, []);

  return (
    <>
      <ComparisonList/>
      <ComparisonForm/>
    </>
  );
}

export default ComparisonControls;