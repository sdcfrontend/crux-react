const Select = ({ options, label, value, currentValue, handler }) => {
  return (
    <select value={currentValue} onChange={handler}>
      <option value="default" disabled>Sites</option>
      {options.map((option, i) => (
        <option key={i} value={value ? option[value] : option}>
          {label ? option[label] : option}
        </option>
      ))}
    </select>
  );
}

export default Select;