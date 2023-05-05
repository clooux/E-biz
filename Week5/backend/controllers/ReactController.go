package controller

import (
	"myapp/models"
	"net/http"

	"github.com/labstack/echo/v4"
)

func (controller *Controller) Pay(c echo.Context) error {
	payment := new(models.Payment)
	if err := c.Bind(payment); err != nil {
		return err
	}
	if payment.CreditCardNumber != "" {
		return c.JSON(http.StatusOK, "Payment done")
	}
	return c.JSON(http.StatusBadRequest, "Not valid credit card number")

}

func (controller *Controller) Send(c echo.Context) error {
	cart := new([]models.Item)
	if err := c.Bind(cart); err != nil {
		return err
	}
	if cart != nil {
		money := 0
		for _, v := range *cart {
			money += v.Amount * v.Price
		}
		return c.JSON(http.StatusOK, money)
	}
	return c.JSON(http.StatusBadRequest, "Not valid cart")

}
