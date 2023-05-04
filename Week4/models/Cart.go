package models

import "gorm.io/gorm"

type Cart struct {
	gorm.Model
	Amount  int
	Product string
	Price   int
}

type Item struct {
	gorm.Model
	ID      int
	Amount  int
	Product string
	Price   int
}
