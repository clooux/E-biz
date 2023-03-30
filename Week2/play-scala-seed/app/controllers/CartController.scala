package controllers

import javax.inject._
import play.api._
import play.api.mvc.{Action, AnyContent, BaseController, ControllerComponents}
import play.api.libs.json._
import scala.collection.mutable
import models.{Cart, NewCart}

@Singleton
class CartController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {
  private val cartList = new mutable.ListBuffer[Cart]()

  implicit val cartListJson = Json.format[Cart]
  implicit val newCartListJson = Json.format[NewCart]

  def getCarts(): Action[AnyContent] = Action {
    if (cartList.isEmpty) {
      NoContent
    } else {
      Ok(Json.toJson(cartList))
    }
  }

  def getCart(id: Int) = Action {
    val foundCart = cartList.find(_.id == id)
    foundCart match {
      case Some(cart) => Ok(Json.toJson(cart))
      case None => NotFound
    }
  }

  def createCart() = Action { implicit request =>
    val content = request.body
    val jsonObject = content.asJson
    val newCartList: Option[NewCart] =
      jsonObject.flatMap(
        Json.fromJson[NewCart](_).asOpt
      )
    newCartList match {
      case Some(newCart) =>
        val nextId: Int = if (cartList.nonEmpty) cartList.map(_.id).max + 1 else 1
        val toBeAdded = Cart(nextId, newCart.amount, newCart.product)
        cartList += toBeAdded
        Created(Json.toJson(toBeAdded))
      case None =>
        BadRequest
    }
  }

  def updateCart(id: Int) = Action { implicit request =>
    val foundCart = cartList.find(_.id == id)
    foundCart match {
      case Some(cart) =>
        val content = request.body
        val jsonObject = content.asJson
        val newCartList: Option[NewCart] =
          jsonObject.flatMap(
            Json.fromJson[NewCart](_).asOpt
          )

        newCartList match {
          case Some(newCart) =>
            cartList -= cart
            val toBeAdded = Cart(id, newCart.amount, newCart.product)
            cartList += toBeAdded
            Accepted(Json.toJson(toBeAdded))
          case None =>
            BadRequest
        }
      case None => NotFound
    }
  }

  def deleteCart(id: Int) = Action {
    var foundCart = cartList.find(_.id == id)
    foundCart match {
      case Some(cart) =>
        cartList -= cart
        Accepted
      case None => NotFound
    }
  }
}
