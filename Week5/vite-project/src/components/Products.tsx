import { useContext } from "react";
import AppContext from "../AppContext";

function Products() {
  const { products, addProduct } = useContext(AppContext)!;
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">List of Products</h1>
      <table className="table w-6/12">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.ID}>
              <td>{product.Name}</td>
              <td>{product.Price}</td>
              <td>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => addProduct(product)}>
                  Add product to cart
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
