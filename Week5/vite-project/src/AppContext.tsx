import { createContext, useEffect, useState } from "react";
import { Item, Product } from "./Models";
import Api from "./Api";

export interface AppState {
  products: Product[];
  cart: Item[];
  money: number;
  addProduct: (product: Product) => void;
  removeProduct: (id: number) => void;
  clearProducts: () => void;
  addMoney: (number: number) => void;
  clearMoney: () => void;
}

const defaultContext: AppState = {
  products: [],
  cart: [],
  money: 0,
  addProduct: () => {
    undefined;
  },
  removeProduct: () => {
    undefined;
  },
  clearProducts: () => {
    undefined;
  },
  addMoney: () => {
    undefined;
  },
  clearMoney: () => {
    undefined;
  },
};

export const AppContext = createContext<AppState>(defaultContext);

export function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Item[]>([]);
  const [money, setMoney] = useState<number>(0);

  const addProduct = (product: Product) => {
    const existingProduct = cart.find((item) => item.ID === product.ID);

    if (existingProduct) {
      setCart((prevItems) =>
        prevItems.map((item) =>
          item.ID === product.ID ? { ...item, quantity: item.Amount + 1 } : item
        )
      );
    } else {
      setCart((prevItems) => [...prevItems, { ...product, Amount: 1 }]);
    }
  };

  const removeProduct = (id: number) => {
    setCart((prevItems) =>
      prevItems
        .map((item) => {
          if (item.ID === id) {
            return { ...item, Amount: item.Amount - 1 };
          } else {
            return item;
          }
        })
        .filter((item) => item.Amount > 0)
    );
  };

  const clearProducts = () => {
    setCart([]);
  };

  const addMoney = (number: number) => {
    setMoney(number);
  };

  const clearMoney = () => {
    setMoney(0);
  };
  const providerValue: AppState = {
    products,
    cart,
    money,
    addProduct,
    removeProduct,
    clearProducts,
    addMoney,
    clearMoney,
  };

  useEffect(() => {
    Api.get<Product[]>("products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>
  );
}

export default AppContext;
