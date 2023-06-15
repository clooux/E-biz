package controller

import (
	"myapp/models"
	"net/http"

	"github.com/labstack/echo/v4"
)

func (controller *Controller) Auth(c echo.Context) error {
	user := new(models.User)
	if err := c.Bind(user); err != nil {
		return err
	}

	auth, err := controller.service.CheckAuth(*user)
	if !auth && err != nil {
		return c.JSON(http.StatusOK, "User is logged in")
	} else if auth && err == nil {
		return c.JSON(http.StatusOK, "Logged in as "+user.Name)
	}

	return c.JSON(http.StatusUnauthorized, "Invalid email or password")
}

func (controller *Controller) Logout(c echo.Context) error {
	controller.service.Logout()

	return c.JSON(http.StatusOK, "User logged out")
}

func (controller *Controller) Register(c echo.Context) error {
	user := new(models.User)
	if err := c.Bind(user); err != nil {
		return err
	}

	if user.Name == "" || user.Password == "" {
		return c.JSON(http.StatusBadRequest, "Invalid email or password")
	} else {
		controller.service.Register(*user)
		return c.JSON(http.StatusOK, "User registered")

	}

}
