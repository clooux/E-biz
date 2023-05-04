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
	db.AutoMigrate(&models.Product{}, &models.Cart{}, &models.Category{})

	db.Create(&models.Product{Name: "produkt47", Price: 100})
	db.Create(&models.Cart{Amount: 1, Product: "produkt"})
	db.Create(&models.Category{Name: "produkty47", Products: []models.Product{
		{Name: "produkt47"},
	}})

	controller := controller.NewController(db)

	e.GET("/products", controller.GetProducts)
	e.GET("/products/:id", controller.GetProduct)
	e.POST("/products", controller.CreateProduct)
	e.PUT("/products/:id", controller.UpdateProduct)
	e.DELETE("/products/:id", controller.DeleteProduct)

	e.GET("/carts/:id", controller.GetCart)

	e.GET("/categories", controller.GetCategories)
	e.GET("/categories/:id", controller.GetCategory)

	e.POST("/payment", controller.Pay)
	e.POST("/cart", controller.Send)

	e.Logger.Fatal(e.Start(":1323"))
}
