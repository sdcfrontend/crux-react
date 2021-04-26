const Settings = ({ metrics, chosenMetrics, setChosenMetrics }) => {
  const handleCheck = (e) => {
    e.target.checked
      ? setChosenMetrics([ ...chosenMetrics, e.target.value ])
      : setChosenMetrics(chosenMetrics.filter(chosenMetric => chosenMetric !== e.target.value))
  }

  return (
    <div>
      {metrics?.map((metric, i) => (
        <div key={i} className="flex">
          <input onChange={handleCheck} type="checkbox" value={metric.name} checked={`${chosenMetrics.includes(metric.name) ? 'checked': ''}`}/>
          {metric.name}
        </div>
      ))}
    </div>
  );
}

export default Settings;