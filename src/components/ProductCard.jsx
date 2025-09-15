export default function ProductCard({ product }) {
  const { name, category, brand, rating, price, imageUrl } = product;

  return (
    <article className="product-card">
      <a href={"#"}>{/* <img src={imageUrl} alt={name} /> */}</a>
      <header>
        <h2>{name}</h2>
      </header>
      <p>Category: {category}</p>
      <p>Brand: {brand}</p>
      <p data-testid="product-rating">Rating: {rating} / 5</p>
      <footer>
        <p data-testid="product-price">Price: ${price}</p>
      </footer>
    </article>
  );
}
