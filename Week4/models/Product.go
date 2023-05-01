package models

import "gorm.io/gorm"

type Product struct {
	gorm.Model
	ID    uint `gorm:"primaryKey"`
	Name  string
	Price int
}
