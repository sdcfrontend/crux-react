import { useEffect, useRef, memo } from 'react';
import { useSelector } from 'react-redux';

const DataBadge = ({ score }) => {
  const selectedFormFactor = useSelector(state => state.ui.selectedFormFactor);
  const badgeRef = useRef();

  const binLabels = ['good', 'average', 'bad'];
  let chosenLabel = binLabels[2];

  if (score > 79) {
    chosenLabel = binLabels[0];
  } else if (score > 59) {
    chosenLabel = binLabels[1];
  }

  useEffect(() => {
    badgeRef.current.style.setProperty('--score', score);
  }, [score, selectedFormFactor])

  return (
    <div className="ui-badge">
      <div ref={badgeRef} className="ui-badge-result" data-score-label={chosenLabel}>
        <svg viewBox="0 0 120 120" className="ui-badge-circle">
          <circle className="ui-badge-circle-bg" r="56" cx="60" cy="60"></circle>
          <circle className="ui-badge-circle-line" r="56" cx="60" cy="60"></circle>
        </svg>

        <span>{`${score}%`}</span>
      </div>

      <div className="ui-control">
        {chosenLabel !== 'good'
          ? <button className="ui-control-button text-s">Diagnose</button>
          : ''
        }
      </div>
    </div>
  );
}

export default memo(DataBadge);