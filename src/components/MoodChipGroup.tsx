import type { Mood } from '../types';

type MoodChipGroupProps = {
  label: string;
  items: Mood[];
  activeItem: string;
  onSelect: (item: string) => void;
};

export function MoodChipGroup({ label, items, activeItem, onSelect }: MoodChipGroupProps) {
  return (
    <div className="group">
      <label>{label}</label>
      <div className="chips">
        <button className={`chip ${activeItem === 'All' ? 'active' : ''}`} onClick={() => onSelect('All')}>
          All
        </button>

        {items.map((item) => (
          <button
            className={`chip ${item.id === activeItem ? 'active' : ''}`}
            key={item.id}
            onClick={() => onSelect(item.id)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}
