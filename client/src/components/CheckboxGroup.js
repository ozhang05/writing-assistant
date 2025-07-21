export default function CheckboxGroup({ label, name, options, selected, onChange }) {
  return (
    <fieldset>
      <legend>{label}:</legend>
      {options.map(opt => (
        <label key={opt} style={{ marginRight: "1rem" }}>
          <input
            type="checkbox"
            name={name}
            value={opt}
            checked={selected.includes(opt)}
            onChange={onChange}
          />
          {opt}
        </label>
      ))}
      <br /><br />
    </fieldset>
  );
}
