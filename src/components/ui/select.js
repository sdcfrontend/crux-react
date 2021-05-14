const Select = ({ options, label, value, defaultOption, currentValue, handler }) => {
  return (
    <div className="ui-control">
      <select className="ui-control-select" value={currentValue} onChange={handler}>
        <option value="default">{defaultOption}</option>
        {options.map((option, i) => (
          <option key={i} value={value ? option[value] : option}>
            {label ? option[label] : option}
          </option>
        ))}
      </select>
      <span className="ui-control-icon ui-icon--down"></span>
    </div>
  );
}

export default Select;