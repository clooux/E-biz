package controller

import (
	"errors"
	"myapp/models"
	"net/http"

	"github.com/labstack/echo/v4"
	"golang.org/x/exp/slices"
)

var isLogged bool = false

var users []models.User = []models.User{{Name: "admin@admin", Password: "admin"}}

func authenticate(user models.User) (bool, error) {
	if isLogged {
		return false, errors.New("loggedIn")
	}

	if slices.Contains(users, user) {
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
		return c.JSON(http.StatusOK, "User is logged in")
	} else if auth && err == nil {
		return c.JSON(http.StatusOK, "Logged in as "+user.Name)
	}

	return c.JSON(http.StatusUnauthorized, "Invalid email or password")
}

func (controller *Controller) Logout(c echo.Context) error {
	isLogged = false

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
		users = append(users, *user)
		return c.JSON(http.StatusOK, "User registered")
	}

}
