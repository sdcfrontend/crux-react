import Metrics from '../components/metrics';

const Compare = () => {
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

      <Metrics/>
    </>
  );
}

export default Compare;