import { useSelector } from 'react-redux';
import { selectComparisonIdsByPageId } from '../../slices/comparisons';
import ComparisonItem from './comparison-item';

const ComparisonList = () => {
  const selectedPage = useSelector(state => state.ui.selectedPage);
  const comparisonIds = useSelector(selectComparisonIdsByPageId(selectedPage));

  return (
    comparisonIds.map(comparisonId => (
      <ComparisonItem key={comparisonId} comparisonId={comparisonId}/>
    ))
  );
}

export default ComparisonList;