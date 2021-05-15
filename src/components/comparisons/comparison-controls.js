import { useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectComparisonIds, selectActiveComparisons, fetchComparisonMetrics } from '../../slices/comparisons';
import ComparisonList from './comparison-list';
import ComparisonForm from './comparison-form';

const ComparisonControls = () => {
  // const selectedPage = useSelector(state => state.ui.selectedPage);
  const activeComparisons = useSelector(selectActiveComparisons('60888ad5eec36917ee5cb9b3'));
  const comparisonIds = useSelector(selectComparisonIds);

  const dispatch = useDispatch();

  useEffect(() => {
    activeComparisons.map(comparison => (
      (!comparison.stored && !comparison.error) && dispatch(fetchComparisonMetrics(comparison))
    ));
  }, [comparisonIds]);

  return (
    <>
      <ComparisonList/>
      <ComparisonForm/>
    </>
  );
}

export default memo(ComparisonControls);