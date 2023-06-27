package config

import (
	"os"

	"golang.org/x/oauth2"
	"golang.org/x/oauth2/github"
	"golang.org/x/oauth2/google"
)

func SetupGoogleConfig() *oauth2.Config {
	conf := &oauth2.Config{
		ClientID:     os.Getenv("GOOGLE_CLIENT_ID"),
		ClientSecret: os.Getenv("GOOGLE_CLIENT_SECRET"),
		RedirectURL:  "http://localhost:1323/oauth/google/callback",
		Scopes: []string{
			"email",
		},
		Endpoint: google.Endpoint,
	}

	return conf
}

func SetupGithubConfig() *oauth2.Config {
	conf := &oauth2.Config{
		ClientID:     os.Getenv("GITHUB_CLIENT_ID"),
		ClientSecret: os.Getenv("GITHUB_CLIENT_SECRET"),
		RedirectURL:  "http://localhost:1323/oauth/github/callback",
		Scopes: []string{
			"email",
		},
		Endpoint: github.Endpoint,
	}

	return conf
}
