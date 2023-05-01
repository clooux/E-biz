package controller

import (
	"myapp/models"
	"myapp/scopes"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

func (controller *Controller) GetCategory(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		panic(err)
	}
	var category models.Category
	controller.db.Scopes(scopes.PreloadProduct).First(&category, "Id = ?", id)
	return c.JSON(http.StatusOK, category)
}

func (controller *Controller) GetCategories(c echo.Context) error {
	var categories []models.Category
	controller.db.Scopes(scopes.PreloadProduct).Find(&categories)
	return c.JSON(http.StatusOK, categories)
}
