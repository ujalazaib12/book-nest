export default function Input({ label, ...props }) {
  return (
    <div className="mb-3">
      {label && <label className="block mb-1">{label}</label>}
      <input className="border p-2 w-full rounded" {...props} />
    </div>
  );
}
