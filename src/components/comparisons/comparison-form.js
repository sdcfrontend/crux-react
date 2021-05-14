import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cuid from 'cuid';
import { addComparison, fetchComparisonMetrics } from '../../slices/comparisons';

const ComparisonForm = () => {
  const [inputText, setInputText] = useState('');

  const selectedPage = useSelector(state => state.ui.selectedPage);

  const dispatch = useDispatch();

  const handleInput = (e) => {
    setInputText(e.target.value);
  }

  const handleAdd = (e) => {    
    e.preventDefault();

    if (inputText === '') return;

    dispatch(addComparison({
      _id: cuid(),
      url: inputText,
      active: true,
      stored: false,
      loading: true,
      error: false,
      dateAdded: Date.now(),
      dateModified: Date.now(),
      pageId: selectedPage,
    }));

    dispatch(fetchComparisonMetrics(inputText))

    setInputText('');
  }

  return (
    <form>
      <input type="text" value={inputText} onChange={handleInput}/>
      <button onClick={handleAdd}>Add Comparison</button>
    </form>
  );
}

export default ComparisonForm