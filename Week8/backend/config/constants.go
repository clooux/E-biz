package config

import (
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

func SetupConfig() *oauth2.Config {
	conf := &oauth2.Config{
		ClientID:     "476220827682-vqj9u8u9fn0fvssracst1kn6gt2sftu0.apps.googleusercontent.com",
		ClientSecret: "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",
		RedirectURL:  "http://localhost:1323/oauth/google/callback",
		Scopes: []string{
			"https://www.googleapis.com/auth/userinfo.email",
		},
		Endpoint: google.Endpoint,
	}

	return conf
}
