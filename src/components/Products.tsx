import { Fragment } from "react/jsx-runtime";
import { useProduct, useProducts } from "../services/queries";
import { useState } from "react";

const Products = () => {
  const [selectProductId, setSelectedProductId] = useState<number | null>(null);

  const productsQuery = useProducts();
  const productQuery = useProduct(selectProductId);

  return (
    <>
      {productsQuery.data?.pages.map((group, index) => (
        <Fragment key={index}>
          {group.map((product) => (
            <Fragment key={product.id}>
              <button onClick={() => setSelectedProductId(product.id)}>
                {product.name}
              </button>
              <br />
            </Fragment>
          ))}
        </Fragment>
      ))}
      <br />
      <div>
        <button
          onClick={() => productsQuery.fetchNextPage()}
          disabled={
            !productsQuery.hasNextPage || productsQuery.isFetchingNextPage
          }
        >
          {productsQuery.isFetchingNextPage
            ? "Loading more..."
            : productsQuery.hasNextPage
            ? "Load more"
            : "Nothing more to load"}
        </button>
      </div>
      <div>Selected Product:</div>
      {JSON.stringify(productQuery.data)}
    </>
  );
};

export default Products;
