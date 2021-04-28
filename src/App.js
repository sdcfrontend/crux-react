import { useState, useEffect } from 'react';
import { useMetrics } from './hooks/use-metrics';

import defaults from './lib/defaults';

import Header from './components/header';
import PagePicker from './components/page-picker';
import DevicePicker from './components/device-picker';
import ComparisonPicker from './components/comparison-picker';
import Metrics from './components/metrics';
import Settings from './components/settings';

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
    <div className="flex-col gap-l wrap">
      <h1>{`${pagesLoading ? 'Loading...' : 'CrUX Dashboard'}`}</h1>

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
    </>
  );
}

export default App;
