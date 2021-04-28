import { useState, useEffect } from 'react';
import { useMetrics } from './hooks/use-metrics';

import defaults from './lib/defaults';

import Header from './components/header';
import PagePicker from './components/page-picker';
import DevicePicker from './components/device-picker';
import ComparisonPicker from './components/comparison-picker';
import Metrics from './components/metrics';
import Settings from './components/settings';
import Groaky from './components/groaky';

function App() {
  const [pagesLoading, setPagesLoading] = useState(true);
  const [sites, setSites] = useState([]);
  const [currentSite, setCurrentSite] = useState();
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState();
  const [currentDevice, setCurrentDevice] = useState(defaults.currentDevice);
  const [chosenMetrics, setChosenMetrics] = useState(defaults.chosenMetrics);
  const [isComparing, setIsComparing] = useState(false);
  const [metricsLoading, setMetricsLoading] = useState(true);
  const [comparisonMetrics, setComparisonMetrics] = useState([]);
  const [comparisonMetricsLoading, setComparisonMetricsLoading] = useState(true);

  const { metrics, loading, requestBody, setRequestBody } = useMetrics(null);

  useEffect(() => {
    setMetricsLoading(loading);
  }, [loading]);

  useEffect(() => {
    setRequestBody({
      ...requestBody,
      origin: currentPage,
      formFactor: currentDevice
    });

  }, [currentPage]);

  useEffect(() => {
    const loadSites = async () => {
      setPagesLoading(true);

      const response = await fetch('http://localhost:4000/sites');
      // const response = await fetch('./data/sites.json');
      const data = await response.json();

      setPagesLoading(false);
      setSites(data);
      setCurrentSite(data[0]);
      setPages(data[0].pages);
      setCurrentPage(data[0].pages[0].url);
    }

    try {
      loadSites();
    }

    catch (error) {
      setPagesLoading(false);

      console.log(error);
    }
  }, []);

  return (
    <>
    <Header
      sites={sites}
      currentSite={currentSite}
      setCurrentSite={setCurrentSite}
      pages={pages}
      setPages={setPages}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      requestBody={requestBody}
      setRequestBody={setRequestBody}
      currentDevice={currentDevice}
      setCurrentDevice={setCurrentDevice}
    />

    <Groaky/>

    <div className="ui-control-block mar-b-s gap-xs wrap" data-tabs>
        <div className="ui-control">
            <button className="ui-control-button display-5" data-active>Targets</button>
        </div>
        <div className="ui-control">
            <button className="ui-control-button display-5">Compare</button>
        </div>
    </div>

    <div className="wrap">
      <div className="flex-col gap-m mar-b-xl ui-panel">
      <div className="ui-control-block flex flex-h-end" data-joined>
          <div className="ui-control text-s">
              <button className="ui-control-button" data-active>% in good category</button>
          </div>
          <div className="ui-control text-s">
              <button className="ui-control-button">Score at 75pc</button>
          </div>
      </div>
        <div className="ui-panel-divider pad-b-xl">
          <h2 className="display-3 mar-b-xs">Largest Contenful Paint</h2>
          <div className="text-supporting text-em mar-b-l">Lower scores best</div>
          <div className="flex gap-m">
            <div className="flex-grow">GRAPH</div>
            <div className="">
              <div className="ui-badge">
                  <div className="ui-badge-result" data-bad>
                    <svg viewBox="0 0 120 120" className="ui-badge-circle">
                      <circle className="ui-badge-circle-bg" r="56" cx="60" cy="60"></circle>
                      <circle className="ui-badge-circle-line" r="56" cx="60" cy="60"></circle>
                    </svg>
                    <span>84%</span>
                  </div>
                  <div className="ui-control">
                    <button className="ui-control-button text-s">Diagnose</button>
                  </div>
              </div>
            </div>
          </div>
        </div>  

        <div className="ui-panel-divider pad-b-xl">
          <h2 className="display-3 mar-b-xs">First Input Delay</h2>
          <div className="text-supporting text-em mar-b-l">Lower scores best</div>
          <div className="flex gap-m">
            <div className="flex-grow">GRAPH</div>
            <div className="">
              <div className="ui-badge">
                <div className="ui-badge-result" data-good>
                    <svg viewBox="0 0 120 120" className="ui-badge-circle">
                      <circle className="ui-badge-circle-bg" r="56" cx="60" cy="60"></circle>
                      <circle className="ui-badge-circle-line" r="56" cx="60" cy="60"></circle>
                    </svg>
                    <span>84%</span>
                  </div>
              </div>
            </div>
          </div>
        </div>  

        <div className="ui-panel-divider pad-b-xl">
          <h2 className="display-3 mar-b-xs">Cumulative Layout Shift</h2>
          <div className="text-supporting text-em mar-b-l">Lower scores best</div>
          <div className="flex gap-m">
            <div className="flex-grow">GRAPH</div>
            <div className="">
            <div className="ui-badge">
                <div className="ui-badge-result" data-average>
                    <svg viewBox="0 0 120 120" className="ui-badge-circle">
                      <circle className="ui-badge-circle-bg" r="56" cx="60" cy="60"></circle>
                      <circle className="ui-badge-circle-line" r="56" cx="60" cy="60"></circle>
                    </svg>
                    <span>84%</span>
                  </div>
              </div>
            </div>
          </div>
        </div>  
      
      <h2 className="display-2">{`${pagesLoading ? 'Loading...' : 'CrUX Dashboard'}`}</h2>

      <div className="flex gap-l flex-v-start">
        <div className="flex-col gap-l flex-grow">
          <ComparisonPicker
            isComparing={isComparing}
            setIsComparing={setIsComparing}
            setComparisonMetrics={setComparisonMetrics}
            setComparisonMetricsLoading={setComparisonMetricsLoading}
            currentDevice={currentDevice}
          />
          <div className="flex gap-s">
            <Metrics
              name={currentSite?.name}
              metrics={metrics}
              chosenMetrics={chosenMetrics}
              metricsLoading={metricsLoading}
            />
            {isComparing &&
              <Metrics
                name="Comparison"
                metrics={comparisonMetrics}
                chosenMetrics={chosenMetrics}
                metricsLoading={comparisonMetricsLoading}
              />
            }
          </div>
        </div>
        
        <Settings
          metrics={metrics}
          chosenMetrics={chosenMetrics}
          setChosenMetrics={setChosenMetrics}
        />
      </div>
    </div>
    </div>
    </>
  );
}

export default App;
