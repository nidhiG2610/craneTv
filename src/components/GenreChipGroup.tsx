type ChipGroupProps = {
  label: string;
  items: { [key: number]: string };
  activeItem: number | 'All';
  onSelect: (item: number|string) => void;
};

export function GenreChipGroup({ label, items, activeItem, onSelect }: ChipGroupProps) {
  return (
    <div className="group">
      <label>{label}</label>
      
      <div className="chips">
        <button className={`chip ${activeItem === 'All' ? 'active' : ''}`} onClick={() => onSelect('All')}> All </button>

        {
          Object.entries(items).map(([id, name]) => (
          <button
            className={`chip ${Number(id) === activeItem ? 'active' : ''}`}
            key={id}
            onClick={() => onSelect(Number(id))}
          >
            {name}
          </button>
          ))
        }
      </div>
    </div>
  );
}
