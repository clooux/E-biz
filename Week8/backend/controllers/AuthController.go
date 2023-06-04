package controller

import (
	"errors"
	"myapp/models"
	"net/http"

	"github.com/labstack/echo/v4"
)

var isLogged bool = false

func authenticate(user models.User) (bool, error) {
	if isLogged {
		return false, errors.New("loggedIn")
	}

	if user.Name == "admin@admin" && user.Password == "admin" {
		isLogged = true
		return true, nil
	}

	return false, nil
}

func (controller *Controller) Auth(c echo.Context) error {
	user := new(models.User)
	if err := c.Bind(user); err != nil {
		return err
	}

	auth, err := authenticate(*user)
	if !auth && err != nil {
		return c.JSON(http.StatusConflict, "User is logged in")
	} else if auth && err == nil {
		return c.JSON(http.StatusOK, "Logged in as "+user.Name)
	}

	return c.JSON(http.StatusUnauthorized, "Invalid username or password")
}

func (controller *Controller) Logout(c echo.Context) error {
	isLogged = false

	return c.JSON(http.StatusOK, "User logged out")
}
