export default function FilterSection({ productCount, sortBy, onSortChange }) {
  return (
    <div className="filter-section">
      <div><span>{productCount}</span> Products</div>
      <select value={sortBy} onChange={e => onSortChange(e.target.value)}>
        <option value="default">Sort By</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="name">Name: A to Z</option>
      </select>
    </div>
  );
}
