export interface Product {
  ID: number;
  Name: string;
  Price: number;
}

export interface Item extends Product {
  Amount: number;
}
