import { useState, useContext } from "react";
import AppContext from "../AppContext";
import Api from "../Api";

function Payment() {
  const [payment, setPayment] = useState({
    CreditCardNumber: "",
    Money: 0,
  });
  const { money, clearProducts, clearMoney } = useContext(AppContext);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPayment((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    payment.Money = money;
    Api.post("/payment", payment)
      .then((res) => res.data)
      .catch(console.log);
    clearProducts();
    clearMoney();
    payment.CreditCardNumber = "";
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">Payment</h1>
      <form onSubmit={handleSubmit} className="flex flex-column">
        <label className="block mb-2">
          Credit card Number
          <input
            type="text"
            name="CreditCardNumber"
            value={payment.CreditCardNumber}
            onChange={handleChange}
            className="border border-gray-400 p-2 w-full rounded-md mt-1"
          />
        </label>
        <input
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
        />
      </form>
    </div>
  );
}

export default Payment;
