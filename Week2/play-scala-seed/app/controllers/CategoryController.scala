package controllers

import javax.inject._
import play.api._
import play.api.mvc.{Action, AnyContent, BaseController, ControllerComponents}
import play.api.libs.json._
import scala.collection.mutable
import models.{Category, NewCategory}

@Singleton
class CategoryController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {
  private val categoryList = new mutable.ListBuffer[Category]()

  implicit val categoryListJson = Json.format[Category]
  implicit val newCategoryListJson = Json.format[NewCategory]

  def getCategorys(): Action[AnyContent] = Action {
    if (categoryList.isEmpty) {
      NoContent
    } else {
      Ok(Json.toJson(categoryList))
    }
  }

  def getCategory(id: Int) = Action {
    val foundCategory = categoryList.find(_.id == id)
    foundCategory match {
      case Some(category) => Ok(Json.toJson(category))
      case None => NotFound
    }
  }

  def createCategory() = Action { implicit request =>
    val content = request.body
    val jsonObject = content.asJson
    val newCategoryList: Option[NewCategory] =
      jsonObject.flatMap(
        Json.fromJson[NewCategory](_).asOpt
      )
    newCategoryList match {
      case Some(newCategory) =>
        val nextId: Int = if (categoryList.nonEmpty) categoryList.map(_.id).max + 1 else 1
        val toBeAdded = Category(nextId, newCategory.name, newCategory.description)
        categoryList += toBeAdded
        Created(Json.toJson(toBeAdded))
      case None =>
        BadRequest
    }
  }

  def updateCategory(id: Int) = Action { implicit request =>
    val foundCategory = categoryList.find(_.id == id)
    foundCategory match {
      case Some(category) =>
        val content = request.body
        val jsonObject = content.asJson
        val newCategoryList: Option[NewCategory] =
          jsonObject.flatMap(
            Json.fromJson[NewCategory](_).asOpt
          )

        newCategoryList match {
          case Some(newCategory) =>
            categoryList -= category
            val toBeAdded = Category(id, newCategory.name, newCategory.description)
            categoryList += toBeAdded
            Accepted(Json.toJson(toBeAdded))
          case None =>
            BadRequest
        }
      case None => NotFound
    }
  }

  def deleteCategory(id: Int) = Action {
    var foundCategory = categoryList.find(_.id == id)
    foundCategory match {
      case Some(category) =>
        categoryList -= category
        Accepted
      case None => NotFound
    }
  }
}
