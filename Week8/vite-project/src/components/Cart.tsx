import Api from "../Api";
import AppContext from "../AppContext";
import { Item } from "../Models";
import { useContext } from "react";

function Cart() {
  const { cart, addProduct, removeProduct, addMoney } = useContext(AppContext);
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    Api.post("/cart", cart)
      .then((res) => addMoney(res.data))
      .catch(console.log);
    
  };
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">Cart</h1>
      <ul>
        {cart.map((item: Item) => (
          <li key={item.ID}>
            {item.Name} - {item.Price} x {item.Amount}
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => addProduct(item)}
            >
              +
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => removeProduct(item.ID)}
            >
              -
            </button>
          </li>
        ))}
      </ul>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSubmit}
      >
        Send Cart
      </button>
    </div>
  );
}

export default Cart;
