package models

import "gorm.io/gorm"

type User struct {
	Name     string
	Password string
}

type OAuthUser struct {
	gorm.Model
	Email string
}
