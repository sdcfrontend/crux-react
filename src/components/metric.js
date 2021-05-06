import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const Metric = ({ metric }) => {
  const selectedDevice = useSelector(state => state.ui.selectedDevice);
  const badgeRef = useRef();

  const nameToNiceName = {
    first_contentful_paint: 'First Contentful Paint',
    largest_contentful_paint: 'Largest Contentful Paint',
    first_input_delay: 'First Input Delay',
    cumulative_layout_shift: 'Cumulative Layout Shift',
  };

  const name = nameToNiceName[metric.name];
  const score = Math.floor(metric[selectedDevice].histogram[0].density * 100);

  const binLabels = ['good', 'average', 'bad'];
  let chosenLabel = binLabels[2];

  if (score > 79) {
    chosenLabel = binLabels[0];
  } else if (score > 59) {
    chosenLabel = binLabels[1];
  }

  useEffect(() => {
    badgeRef.current.style.setProperty(`--score`, `${score}`);
  }, [selectedDevice])

  return (
    <>
    <div className="ui-panel-divider pad-b-xl">
      <h2 className="display-3 mar-b-xs">{name}</h2>

      <div className="text-supporting text-em mar-b-l">Lower scores best</div>
        <div className="flex gap-m">
          <div className="flex-grow">GRAPH</div>
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
          <div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Metric;