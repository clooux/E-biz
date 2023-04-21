package controller

import (
	"myapp/models"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

func (controller *Controller) GetCart(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		panic(err)
	}
	var cart models.Cart
	controller.db.First(&cart, "Id = ?", id)
	return c.JSON(http.StatusOK, cart)
}
