package models

case class Cart(id: Int, amount: Int, product: String)

case class NewCart(amount: Int, product: String)