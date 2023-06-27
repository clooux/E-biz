package controller

import (
	"context"
	"encoding/json"
	"io"
	"myapp/config"
	"myapp/models"
	"net/http"

	"github.com/labstack/echo/v4"
)

func (controller *Controller) GoogleAuth(c echo.Context) error {
	googleConfig := config.SetupGoogleConfig()
	url := googleConfig.AuthCodeURL("randomstate")
	return c.Redirect(http.StatusSeeOther, url)
}

func (controller *Controller) GithubAuth(c echo.Context) error {
	githubConfig := config.SetupGithubConfig()
	url := githubConfig.AuthCodeURL("randomstate")
	return c.Redirect(http.StatusSeeOther, url)
}

func (controller *Controller) GoogleCallback(c echo.Context) error {
	state := c.QueryParam("state")

	if state != "randomstate" {
		return c.JSON(http.StatusBadRequest, "State doesn't match")
	}

	googleConfig := config.SetupGoogleConfig()

	token, err := googleConfig.Exchange(context.Background(), c.FormValue("code"))

	if err != nil {
		return c.JSON(http.StatusInternalServerError, "Code-Token Exchange Failed")
	}

	client := googleConfig.Client(context.Background(), token)
	response, err := client.Get("https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + token.AccessToken)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, "User Data Fetch Failed")
	}

	defer func(Body io.ReadCloser) {
		err := Body.Close()
		if err != nil {
			panic(err)
		}
	}(response.Body)

	content, err := io.ReadAll(response.Body)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "JSON Parsing Failed")
	}

	jsonMap := make(map[string]interface{})
	err = json.Unmarshal(content, &jsonMap)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "JSON Parsing Failed")
	}

	userEmail := jsonMap["email"].(string)
	user := new(models.OAuthUser)
	user.Email = userEmail
	controller.db.Create(&user)

	return c.Redirect(http.StatusFound, "http://localhost:5173/")
}

func (controller *Controller) GithubCallback(c echo.Context) error {
	state := c.QueryParam("state")

	if state != "randomstate" {
		return c.JSON(http.StatusBadRequest, "State doesn't match")
	}

	githubConfig := config.SetupGithubConfig()

	token, err := githubConfig.Exchange(context.Background(), c.FormValue("code"))

	if err != nil {
		return c.JSON(http.StatusInternalServerError, "Code-Token Exchange Failed")
	}

	client := githubConfig.Client(context.Background(), token)
	response, err := client.Get("https://api.github.com/user?access_token=" + token.AccessToken)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "User Data Fetch Failed")
	}

	defer func(Body io.ReadCloser) {
		err := Body.Close()
		if err != nil {
			panic(err)
		}
	}(response.Body)
	content, err := io.ReadAll(response.Body)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "JSON Parsing Failed")
	}

	jsonMap := make(map[string]interface{})
	err = json.Unmarshal(content, &jsonMap)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "JSON Parsing Failed")
	}

	userEmail := jsonMap["email"].(string)
	user := new(models.OAuthUser)
	user.Email = userEmail
	controller.db.Create(&user)

	return c.Redirect(http.StatusFound, "http://localhost:5173/")
}
