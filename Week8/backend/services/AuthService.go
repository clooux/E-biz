package services

import (
	"errors"
	"myapp/models"

	"golang.org/x/exp/slices"
)

var isLogged bool = false

var users []models.User = []models.User{{Name: "admin@admin", Password: "admin"}}

func checkAuth(user models.User) (bool, error) {
	if isLogged {
		return false, errors.New("loggedIn")
	}

	if slices.Contains(users, user) {
		isLogged = true
		return true, nil
	}

	return false, nil
}

func register(user models.User) {
	users = append(users, user)
}

func logout() {
	isLogged = false
}
