package main

import (
	controller "myapp/controllers"
	"myapp/models"

	"github.com/glebarez/sqlite"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"gorm.io/gorm"
)

func main() {
	e := echo.New()
	e.Use(middleware.CORS())
	db, err := gorm.Open(sqlite.Open("gorm.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	// Migrate the schema
	db.AutoMigrate(&models.Product{})

	db.Create(&models.Product{Name: "produkt47", Price: 100})

	controller := controller.NewController(db)

	e.GET("/products", controller.GetProducts)
	e.GET("/products/:id", controller.GetProduct)
	e.POST("/products", controller.CreateProduct)
	e.PUT("/products/:id", controller.UpdateProduct)
	e.DELETE("/products/:id", controller.DeleteProduct)

	e.POST("/payment", controller.Pay)
	e.POST("/cart", controller.Send)

	e.Logger.Fatal(e.Start(":1323"))
}
