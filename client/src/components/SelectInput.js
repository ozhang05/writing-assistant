export default function SelectInput({ label, name, options, value, onChange }) {
  return (
    <label>
      {label}:
      <select name={name} value={value} onChange={onChange}>
        <option value="">Select</option>
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <br /><br />
    </label>
  );
}
