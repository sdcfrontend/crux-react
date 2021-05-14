import { memo } from 'react';
import ComparisonCharts from '../components/comparisons/comparison-charts';
import ComparisonControls from '../components/comparisons/comparison-controls';

const Compare = () => {
  console.log('compare page')

  // const createCombinedMetrics = (pageMetrics, comparisonMetrics) => {
  //   return pageMetrics.map((metric, index) => ({
  //     ...metric,
  //     pages: [
  //       {
  //         page: 'selectedPageEntity.url',
  //         PHONE: metric['PHONE'],
  //         DESKTOP: metric['DESKTOP'],
  //       },
  //       ...comparisonMetrics.reduce((loadedComparisons, comparisonMetric) => (
  //         comparisonMetric.stored
  //           ? [ ...loadedComparisons,
  //               {
  //                 page: comparisonMetric.url,
  //                 PHONE: comparisonMetric.data[index]['PHONE'],
  //                 DESKTOP: comparisonMetric.data[index]['DESKTOP'],
  //               }
  //             ]
  //           : loadedComparisons
  //       ), [])
  //     ]
  //   }))
  // }

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

      <div className="layout-main gap-l">
        <div className="layout-main-body">
          <ComparisonCharts/>
        </div>

        <div className="layout-main-side pad-l-m">
          <ComparisonControls/>
        </div>
      </div>
    </>
  );
}

export default memo(Compare);