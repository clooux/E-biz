package controllers

import javax.inject._
import play.api._
import play.api.mvc.{Action, AnyContent, BaseController, ControllerComponents}
import play.api.libs.json._
import scala.collection.mutable
import models.{Product, NewProduct}

@Singleton
class ProductController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {
  private val productList = new mutable.ListBuffer[Product]()

  implicit val productListJson = Json.format[Product]
  implicit val newProductListJson = Json.format[NewProduct]

  def getProducts(): Action[AnyContent] = Action {
    if (productList.isEmpty) {
      NoContent
    } else {
      Ok(Json.toJson(productList))
    }
  }

  def getProduct(id: Int) = Action {
    val foundProduct = productList.find(_.id == id)
    foundProduct match {
      case Some(product) => Ok(Json.toJson(product))
      case None => NotFound
    }
  }

  def createProduct() = Action { implicit request =>
    val content = request.body
    val jsonObject = content.asJson
    val newProductList: Option[NewProduct] =
      jsonObject.flatMap(
        Json.fromJson[NewProduct](_).asOpt
      )
    newProductList match {
      case Some(newProduct) =>
        val nextId: Int = if (productList.nonEmpty) productList.map(_.id).max + 1 else 1
        val toBeAdded = Product(nextId, newProduct.name, newProduct.price)
        productList += toBeAdded
        Created(Json.toJson(toBeAdded))
      case None =>
        BadRequest
    }
  }

  def updateProduct(id: Int) = Action { implicit request =>
    val foundProduct = productList.find(_.id == id)
    foundProduct match {
      case Some(product) =>
        val content = request.body
        val jsonObject = content.asJson
        val newProductList: Option[NewProduct] =
          jsonObject.flatMap(
            Json.fromJson[NewProduct](_).asOpt
          )

        newProductList match {
          case Some(newProduct) =>
            productList -= product
            val toBeAdded = Product(id, newProduct.name, newProduct.price)
            productList += toBeAdded
            Accepted(Json.toJson(toBeAdded))
          case None =>
            BadRequest
        }
      case None => NotFound
    }
  }

  def deleteProduct(id: Int) = Action {
    var foundProduct = productList.find(_.id == id)
    foundProduct match {
      case Some(product) =>
        productList -= product
        Accepted
      case None => NotFound
    }
  }
}
