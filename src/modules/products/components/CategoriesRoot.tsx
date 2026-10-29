import { Link } from "react-router";

import { categoriesApi } from "@/api/products.api";
import { Breadcrumbs } from "@/shared/components";
import { useDocumentTitle } from "@/shared/hooks";

export const CategoriesRoot = () => {
  useDocumentTitle("Categories");

  return (
    <>
      <Breadcrumbs items={[{ label: "Categories" }]} />
      <section className="mx-4 my-16 sm:mx-10">
        <h1 className="mb-10 text-4xl font-medium text-navy">
          Shop by <span className="text-brand">category</span>
        </h1>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categoriesApi.list().map((category) => (
            <li key={category.slug}>
              <Link
                to={`/categories/${category.slug}`}
                className="group flex items-center gap-5 rounded-3xl border border-slate-200 p-5 transition-shadow hover:shadow-card"
              >
                <img
                  src={category.image}
                  alt=""
                  loading="lazy"
                  width={96}
                  height={96}
                  className="size-24 rounded-full object-cover shadow-header"
                />
                <span>
                  <span className="block text-xl font-bold text-navy group-hover:text-brand">
                    {category.name}
                  </span>
                  <span className="text-slate-500">
                    {category.productCount} {category.productCount === 1 ? "product" : "products"}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};
