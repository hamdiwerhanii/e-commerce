import { Link } from "react-router";

import { categoriesApi } from "@/api/products.api";

export const CategoryShowcase = () => (
  <section aria-labelledby="categories-title" className="mx-4 my-24 sm:mx-10">
    <h2 id="categories-title" className="sr-only">
      Shop by category
    </h2>
    <ul className="grid grid-cols-2 gap-x-6 gap-y-16 sm:grid-cols-3 lg:grid-cols-6">
      {categoriesApi.list().map((category) => (
        <li key={category.slug} className="relative">
          <img
            src={category.image}
            alt=""
            loading="lazy"
            width={256}
            height={256}
            className="mx-auto aspect-square w-full max-w-56 rounded-full object-cover shadow-header"
          />
          <Link
            to={`/categories/${category.slug}`}
            className="absolute inset-x-[10%] -bottom-6 rounded-3xl bg-white py-3 text-center font-bold text-navy shadow-header transition-all hover:-translate-y-1 hover:bg-navy hover:text-white"
          >
            {category.name}
          </Link>
        </li>
      ))}
    </ul>
  </section>
);
