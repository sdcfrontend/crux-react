import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectComparisonIds, selectActiveComparisons, fetchComparisonMetrics } from '../../slices/comparisons';
import ComparisonList from './comparison-list';
import ComparisonForm from './comparison-form';

const ComparisonControls = () => {
  const selectedPage = useSelector(state => state.ui.selectedPage);
  const activeComparisons = useSelector(selectActiveComparisons(selectedPage));
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

export default ComparisonControls;