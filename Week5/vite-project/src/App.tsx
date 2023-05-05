import { Route, Router } from "wouter";
import Products from "./components/Products";
import Navbar from "./components/Navbar";

import Payment from "./components/Payment";
import { AppContextProvider } from "./AppContext";
import Cart from "./components/Cart";

function App() {
  return (
    <div>
      <AppContextProvider>
        <Router>
          <Navbar>
            <Route path="/products" component={Products} />
            <Route path="/payment" component={Payment} />
            <Route path="/cart" component={Cart}/>
          </Navbar>
        </Router>
      </AppContextProvider>
    </div>
  );
}

export default App;
