import { Link } from "react-router-dom";
import type { Product } from "../types/product";
import noImage from '../assets/Noimage.png'


type ProductCardProps = {
    product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link to={`/products/${product.id}`}>
      <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
        <img
          src={product.image}
          alt={product.title}
          className="mb-4 h-40 w-full object-contain"
          onError={(e) => {
            e.currentTarget.src = noImage
          }}
        />

        <h2 className="line-clamp-2 text-sm font-semibold text-slate-900">
          {product.title}
        </h2>

        <p className="mt-3 text-lg font-bold text-slate-800">
          ${product.price}
        </p>

        <p className="mt-2 text-xs capitalize text-slate-500">
          {product.category}
        </p>
      </article>
    </Link>
  )
}

export default ProductCard