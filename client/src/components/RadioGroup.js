export default function RadioGroup({ label, name, options, selected, onChange }) {
  return (
    <fieldset>
      <legend>{label}:</legend>
      {options.map(opt => (
        <label key={opt} style={{ display: "block" }}>
          <input
            type="radio"
            name={name}
            value={opt}
            checked={selected === opt}
            onChange={onChange}
          />
          {opt}
        </label>
      ))}
      <br />
    </fieldset>
  );
}
