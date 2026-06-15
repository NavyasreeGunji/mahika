const CATEGORIES = ['all', 'Sarees', 'Dresses', 'Jewelry', 'Bags', 'Rental'];
const LABELS = { all: 'All', Sarees: 'Sarees', Dresses: 'Dresses', Jewelry: 'Jewellery', Bags: 'Bags', Rental: 'Rental' };

export default function Nav({ currentCategory, onCategoryChange }) {
  return (
    <div className="nav">
      {CATEGORIES.map(cat => (
        <button
          key={cat}
          className={currentCategory === cat ? 'active' : ''}
          onClick={() => onCategoryChange(cat)}
        >
          {LABELS[cat]}
        </button>
      ))}
    </div>
  );
}
