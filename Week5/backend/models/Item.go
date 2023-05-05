package models

import "gorm.io/gorm"

type Item struct {
	gorm.Model
	ID      int
	Amount  int
	Product string
	Price   int
}
