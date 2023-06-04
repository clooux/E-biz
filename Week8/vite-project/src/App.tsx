import { Route, Router } from "wouter";
import Products from "./components/Products";
import Navbar from "./components/Navbar";

import Payment from "./components/Payment";
import { AppContextProvider } from "./AppContext";
import Cart from "./components/Cart";
import Login from "./components/Login";
import PrivateRoute from "./PrivateRoute";
import Register from "./components/Register";

function App() {
  return (
    <div>
      <AppContextProvider>
        <Router>
          <Navbar>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <PrivateRoute path="/payment" component={Payment} />
            <PrivateRoute path="/cart" component={Cart} />
            <Route path="/products" component={Products} />
          </Navbar>
        </Router>
      </AppContextProvider>
    </div>
  );
}

export default App;
