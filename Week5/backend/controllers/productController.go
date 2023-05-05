package controller

import (
	"myapp/models"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

func (controller *Controller) GetProduct(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		panic(err)
	}
	var product models.Product
	controller.db.First(&product, "Id = ?", id)
	return c.JSON(http.StatusOK, product)
}

func (controller *Controller) GetProducts(c echo.Context) error {
	var products []models.Product
	controller.db.Find(&products)
	return c.JSON(http.StatusOK, products)
}

func (controller *Controller) CreateProduct(c echo.Context) error {
	product := new(models.Product)
	if err := c.Bind(product); err != nil {
		return err
	}
	controller.db.Create(&product)
	return c.JSON(http.StatusCreated, product)
}

func (controller *Controller) UpdateProduct(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		panic(err)
	}
	var product models.Product
	newProduct := new(models.Product)
	controller.db.First(&product, "Id = ?", id)
	if err := c.Bind(newProduct); err != nil {
		return err
	}
	product.Name = newProduct.Name
	product.Price = newProduct.Price
	controller.db.Save(&product)
	return c.JSON(http.StatusAccepted, product)
}

func (controller *Controller) DeleteProduct(c echo.Context) error {
	c.Param("id")
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		panic(err)
	}
	var product models.Product
	controller.db.First(&product, "Id = ?", id)
	controller.db.Delete(&product)
	return c.NoContent(http.StatusNoContent)
}
