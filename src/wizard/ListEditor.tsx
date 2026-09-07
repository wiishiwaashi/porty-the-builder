type Field = { key: string; label: string };

/** Editor for an array of flat string records (education rows, project cards, contact links). */
function ListEditor<T extends Record<string, string | undefined>>({
  items,
  onChange,
  fields,
  emptyItem,
  addLabel = '+ Add',
}: {
  items: T[];
  onChange: (items: T[]) => void;
  fields: Field[];
  emptyItem: T;
  addLabel?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item, i) => (
        <div key={i} className="flex flex-wrap gap-2 rounded border p-2">
          {fields.map((f) => (
            <input
              key={f.key}
              value={item[f.key] ?? ''}
              placeholder={f.label}
              onChange={(e) => {
                const next = items.slice();
                next[i] = { ...next[i], [f.key]: e.target.value };
                onChange(next);
              }}
              className="min-w-32 flex-1 rounded border px-2 py-1 text-sm"
            />
          ))}
          <button
            type="button"
            onClick={() => onChange(items.filter((_, idx) => idx !== i))}
            className="text-sm opacity-60 hover:opacity-100"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, emptyItem])}
        className="self-start text-sm underline"
      >
        {addLabel}
      </button>
    </div>
  );
}

export default ListEditor;
