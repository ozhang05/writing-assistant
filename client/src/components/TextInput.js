export default function TextInput({ label, name, value, onChange }) {
  return (
    <label>
      {label}:
      <input type="text" name={name} value={value} onChange={onChange} />
      <br /><br />
    </label>
  );
}