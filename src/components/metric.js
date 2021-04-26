import { useEffect, useRef } from 'react';

const Metric = ({ metric }) => {
  const gridRef = useRef();

  const nameToAcronymMap = {
    first_contentful_paint: 'FCP',
    largest_contentful_paint: 'LCP',
    first_input_delay: 'FID',
    cumulative_layout_shift: 'CLS',
  };
  const standardBinLabels = ['Good', 'Needs Improvement', 'Poor'];

  const acronym = nameToAcronymMap[metric.name];
  const labelledBins = metric.histogram.map((bin, i) => (
    {
      label: standardBinLabels[i],
      labelSlug: standardBinLabels[i].split(' ').join('-').toLowerCase(),
      percentage: bin.density * 100,
      ...bin,
    }
  ));

  useEffect(() => {
    labelledBins.map(bin => gridRef.current.style.setProperty(`--${bin.labelSlug}`, `${bin.percentage}%`))
  }, [metric, labelledBins])

  return (
    <div>
      <h3>{acronym}</h3>

      <p>{labelledBins.map(bin =>`${bin.label}: ${bin.percentage.toFixed(2)}%`).join(', ')}</p>

      <div ref={gridRef} className="grid">
        {labelledBins.map((bin, i) => (
          <div key={i} className={`bar bar-${bin.labelSlug}`}></div>
        ))}
      </div>
    </div>
  );
}

export default Metric;