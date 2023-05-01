package scopes

import "gorm.io/gorm"

func PreloadProduct(db *gorm.DB) *gorm.DB {
	return db.Preload("Products")
}
