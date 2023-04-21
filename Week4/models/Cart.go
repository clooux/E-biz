package models

import "gorm.io/gorm"

type Cart struct {
	gorm.Model
	Amount  int
	Product string
}
