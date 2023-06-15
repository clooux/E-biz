package controller

import (
	"myapp/services"

	"gorm.io/gorm"
)

type Controller struct {
	db      *gorm.DB
	service *services.Service
}

func NewController(db *gorm.DB, service *services.Service) *Controller {
	return &Controller{db: db, service: service}
}
