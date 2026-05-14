type ChipGroupProps = {
  label: string;
  items: string[];
  activeItem: string | null;
  onSelect: (item: string | null) => void;
};

export function ChipGroup({ label, items, activeItem, onSelect }: ChipGroupProps) {
  return (
    <div className="group">
      <label>{label}</label>
      <div className="chips">
        <button className={`chip ${activeItem === null ? 'active' : ''}`} onClick={() => onSelect(null)}> All </button>

        {
          items.map((item) => (
            <button
              className={`chip ${item === activeItem ? 'active' : ''}`}
              key={item}
              onClick={() => onSelect(item)}
            >
              {item}
            </button>
          ))
        }
      </div>
    </div>
  );
}
