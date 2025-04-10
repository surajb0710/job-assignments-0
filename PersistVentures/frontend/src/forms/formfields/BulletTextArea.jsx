export default function BulletTextArea({
  type,
  id,
  placeholder,
  onBlur,
  value,
  setFieldValue,
}) {
  const handleChange = (e) => {
    const lines = e.target.value.split('\n');
    const updated = lines.map((line) =>
      line.startsWith('- ') ? line : `- ${line.replace(/^(- )?/, '')}`
    );
    setFieldValue(id, updated.join('\n'));
  };

  const handleKeyDown = (e) => {
    const { selectionStart, value } = e.target;
    if (
      (e.key === 'Backspace' || e.key === 'Delete') &&
      value.substring(selectionStart - 2, selectionStart) === '- '
    ) {
      e.preventDefault();
    }
  };

  return (
    <textarea
      type={type}
      id={id}
      placeholder={placeholder}
      onChange={handleChange}
      value={value}
      onBlur={onBlur}
      rows={5}
      onKeyDown={handleKeyDown}
      className="w-full shadow-[inset_0px_0px_5px_1px_#f7fafc90] text-sm px-4 py-3 mt-2 rounded-xl resize-none"
    />
  );
}
