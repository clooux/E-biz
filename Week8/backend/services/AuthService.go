package services

import (
	"errors"
	"myapp/models"

	"golang.org/x/exp/slices"
)

type Service struct {
	isLogged bool
	users    []models.User
}

func NewService() *Service {
	return &Service{isLogged: false, users: []models.User{{Name: "admin@admin", Password: "admin"}}}
}

func (service *Service) CheckAuth(user models.User) (bool, error) {
	if service.isLogged {
		return false, errors.New("loggedIn")
	}

	if slices.Contains(service.users, user) {
		service.isLogged = true
		return true, nil
	}

	return false, nil
}

func (service *Service) Register(user models.User) {
	service.users = append(service.users, user)
}

func (service *Service) Logout() {
	service.isLogged = false
}
