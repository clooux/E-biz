import { Link } from "wouter";

function Navbar({ children }: { children: React.ReactNode }) {
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
          </ul>
        </div>
      </nav>
      {children}
    </div>
  );
}

export default Navbar;
