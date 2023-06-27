package controller

import (
	"context"
	"encoding/json"
	"io"
	"myapp/config"
	"net/http"

	"github.com/labstack/echo/v4"
)

func (controller *Controller) GoogleAuth(c echo.Context) error {
	googleConfig := config.SetupConfig()
	url := googleConfig.AuthCodeURL("randomstate")
	return c.Redirect(http.StatusSeeOther, url)
}

func (controller *Controller) GoogleCallback(c echo.Context) error {
	state := c.QueryParam("state")

	if state != "randomstate" {
		return c.JSON(http.StatusBadRequest, "State doesn't match")
	}

	code := c.QueryParam("code")

	googleConfig := config.SetupConfig()

	token, err := googleConfig.Exchange(context.Background(), code)

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
	contents, err := io.ReadAll(response.Body)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "JSON Parsing Failed")
	}

	jsonMap := make(map[string]interface{})
	err = json.Unmarshal(contents, &jsonMap)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "JSON Parsing Failed")
	}
	// userMail := jsonMap["email"].(string)

	return c.Redirect(http.StatusOK, "http://localhost:5137")
}
