import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import Api from "../Api";

function Navbar({ children }: { children: React.ReactNode }) {
  const [, navigate] = useLocation();
  let auth = sessionStorage.getItem("auth");

  useEffect(() => {
    auth = sessionStorage.getItem("auth");
  }, [auth]);

  const logout = async () => {
    const response = await Api.get("/logout");
    if (response.status == 200) {
      sessionStorage.removeItem("auth");
    }
    navigate("/products");
  };

  const handleLogout = async (event: React.MouseEvent) => {
    event.preventDefault();
    await logout();
    sessionStorage.removeItem("auth");
    navigate("/login", { replace: true });
  };

  return (
    <div>
      <nav className="flex flex-no-wrap relative w-full items-center justify-between bg-neutral-100">
        <div className="flex w-full flex-wrap items-center justify-between ">
          <ul className="flex items-center p-4">
            <li className="mx-5">
              <Link href="/products">
                <a className="hover:text-blue-800">Products</a>
              </Link>
            </li>
            <li className="mx-5">
              <Link href="/payment">
                <a className="hover:text-blue-800">Payment</a>
              </Link>
            </li>
            <li className="mx-5">
              <Link href="/cart">
                <a className="hover:text-blue-800">Cart</a>
              </Link>
            </li>
            <li className="mx-5">
              <Link href="/register">
                <a className="hover:text-blue-800">Register</a>
              </Link>
            </li>
            <li className="mx-5">
              {!auth ? (
                <Link to="/login" className="hover:text-blue-800">
                  Log in
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="hover:text-blue-800"
                  onClick={handleLogout}
                >
                  Log out
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
      {children}
    </div>
  );
}

export default Navbar;
