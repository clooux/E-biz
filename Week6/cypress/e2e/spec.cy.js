import { faker } from "@faker-js/faker";

describe("amazon tests", () => {
  it("should load main page", () => {
    cy.visit("https://www.amazon.pl/");
    cy.contains("Kontynuuj bez akceptacji").click();
    cy.contains("Bezpieczne logowanie").should("exist");
  });

  it("should not load order", () => {
    cy.visit("https://www.amazon.pl/");
    cy.contains("Zwroty i zamówienia").click();
    cy.contains("Zaloguj się").should("exist");
  });

  it("should not load cart", () => {
    cy.visit("https://www.amazon.pl/");
    cy.contains("Koszyk").click();
    cy.contains("Zaloguj się na swoje konto").should("exist");
  });

  it("should move to prime", () => {
    cy.visit("https://www.amazon.pl/");
    cy.get("#nav-link-amazonprime").click();
  cy.url().should("contain", "prime");
  });

  it("should search phrase", () => {
    cy.visit("https://www.amazon.pl/");
    cy.get("#twotabsearchtextbox").type("clean code");
    cy.get("#twotabsearchtextbox").should('have.value', 'clean code');
    cy.get("#nav-search-submit-button").click();
    cy.contains("Clean Code: A Handbook of Agile Software Craftsmanship").should("exist");
  });

  it("should search after search", () => {
    cy.visit("https://www.amazon.pl/");
    cy.get("#twotabsearchtextbox").type("clean code");
    cy.get("#twotabsearchtextbox").should('have.value', 'clean code');
    cy.get("#nav-search-submit-button").click();
    cy.contains(
      "Clean Code: A Handbook of Agile Software Craftsmanship"
    ).should("exist");
    cy.get("#twotabsearchtextbox").clear();
    cy.get("#twotabsearchtextbox").should('have.value', '');
    cy.get("#twotabsearchtextbox").type("javascript");
    cy.get("#twotabsearchtextbox").should('have.value', 'javascript');
    cy.get("#nav-search-submit-button").click();
    cy.contains(
      "Javascript: The Definitive Guide: Master the World's Most-Used Programming Language"
    ).should("exist");
  
  });

  it("should open right book", () => {
    cy.visit("https://www.amazon.pl/");
    cy.get("#twotabsearchtextbox").type("clean code");
    cy.get("#twotabsearchtextbox").should('have.value', 'clean code');
    cy.get("#nav-search-submit-button").click();
    cy.contains(
      "Clean Code: A Handbook of Agile Software Craftsmanship"
    ).should("exist");
    cy.get("a")
      .contains("Clean Code: A Handbook of Agile Software Craftsmanship")
      .click();
     cy.get("#price").should("exist");
  });

  it("should add book to cart", () => {
    cy.visit("https://www.amazon.pl/");
    cy.get("#twotabsearchtextbox").type("clean code");
    cy.get("#twotabsearchtextbox").should('have.value', 'clean code');
    cy.get("#nav-search-submit-button").click();
    cy.contains(
      "Clean Code: A Handbook of Agile Software Craftsmanship"
    ).should("exist");
    cy.get("a")
      .contains("Clean Code: A Handbook of Agile Software Craftsmanship")
      .click();
    cy.get("#price").should("exist");
    cy.contains("input", "Dodaj do koszyka").click();
    cy.contains(" Dodano do koszyka").should("exist");
  });

  it("should buy book now", () => {
    cy.visit("https://www.amazon.pl/");
    cy.get("#twotabsearchtextbox").type("clean code");
    cy.get("#twotabsearchtextbox").should('have.value', 'clean code');
    cy.get("#nav-search-submit-button").click();
    cy.contains(
      "Clean Code: A Handbook of Agile Software Craftsmanship"
    ).should("exist");
    cy.get("a")
      .contains("Clean Code: A Handbook of Agile Software Craftsmanship")
      .click();
     cy.get("#price").should("exist");
    cy.contains("input", "Kup teraz").click();
    cy.contains(" Dodano do koszyka").should("exist");
  });

  it("should go to cart after adding book", () => {
    cy.visit("https://www.amazon.pl/");
    cy.get("#twotabsearchtextbox").type("clean code");
    cy.get("#twotabsearchtextbox").should("have.value", "clean code");
    cy.get("#nav-search-submit-button").click();
    cy.contains(
      "Clean Code: A Handbook of Agile Software Craftsmanship"
    ).should("exist");
    cy.get("a")
      .contains("Clean Code: A Handbook of Agile Software Craftsmanship")
      .click();
    cy.get("#price").should("exist");
    cy.contains("input", "Dodaj do koszyka").click();
    cy.contains("Dodano do koszyka").should("exist");
    cy.contains("Przejdź do koszyka").click();
    cy.contains("Suma (1 przedmiot):").should("exist");
  });

  it("should go to finalization after adding book", () => {
    cy.visit("https://www.amazon.pl/");
    cy.get("#twotabsearchtextbox").type("clean code");
    cy.get("#twotabsearchtextbox").should("have.value", "clean code");
    cy.get("#nav-search-submit-button").click();
    cy.contains(
      "Clean Code: A Handbook of Agile Software Craftsmanship"
    ).should("exist");
    cy.get("a")
      .contains("Clean Code: A Handbook of Agile Software Craftsmanship")
      .click();
    cy.get("#price").should("exist");
    cy.contains("input", "Dodaj do koszyka").click();
    cy.contains("Dodano do koszyka").should("exist");
    cy.get("[name=proceedToRetailCheckout]").click();
    cy.contains("Zaloguj się").should("exist");
  });

  it("should go to finalization of purchase", () => {
    cy.visit("https://www.amazon.pl/");
    cy.get("#twotabsearchtextbox").type("clean code");
    cy.get("#twotabsearchtextbox").should("have.value", "clean code");
    cy.get("#nav-search-submit-button").click();
    cy.contains(
      "Clean Code: A Handbook of Agile Software Craftsmanship"
    ).should("exist");
    cy.get("a")
      .contains("Clean Code: A Handbook of Agile Software Craftsmanship")
      .click();
    cy.get("#price").should("exist");
    cy.contains("input", "Dodaj do koszyka").click();
    cy.contains("Dodano do koszyka").should("exist");
    cy.contains("Przejdź do koszyka").click();
    cy.contains("Suma (1 przedmiot):").should("exist");
    cy.get("[name=proceedToRetailCheckout]").click();
    cy.contains("Zaloguj się").should("exist");
  });

  it("should go to login page", () => {
    cy.visit("https://www.amazon.pl/");
    cy.contains("Zaloguj się").click({force: true});
    cy.contains("Zaloguj się").should("exist");
  });

  it("should show alert", () => {
    cy.visit("https://www.amazon.pl/");
    cy.contains("Zaloguj się").click({ force: true });
    cy.contains("Zaloguj się").should("exist");
    cy.get("#continue").click();
    cy.contains("Podaj adres e-mail lub numer telefonu komórkowego").should(
      "exist"
    );
  });

  it("should show incorrect phone number", () => {
    cy.visit("https://www.amazon.pl/");
    cy.contains("Zaloguj się").click({ force: true });
    cy.contains("Zaloguj się").should("exist");
    const number = faker.phone.number();
    cy.get("[type=email]").type(number);
    cy.get("#continue").click();
    cy.contains("Nieprawidłowy numer telefonu").should(
      "exist"
    );
  });

  it("should show not found email", () => {
    cy.visit("https://www.amazon.pl/");
    cy.contains("Zaloguj się").click({ force: true });
    cy.contains("Zaloguj się").should("exist");
    const email = faker.internet.email();
    cy.get("[type=email]").type(email);
    cy.get("#continue").click();
    cy.contains("Wystąpił błąd").should("exist");
  });

  it("should go to create account", () => {
    cy.visit("https://www.amazon.pl/");
    cy.contains("Zaloguj się").click({ force: true });
    cy.contains("Utwórz konto Amazon").should("exist");
    cy.get("#createAccountSubmit").click();
    cy.contains("Utwórz konto").should("exist");
  });

  it("should show alert after trying to create account without input", () => {
    cy.visit("https://www.amazon.pl/");
    cy.contains("Zaloguj się").click({ force: true });
    cy.contains("Utwórz konto Amazon").should("exist");
    cy.get("#createAccountSubmit").click();
    cy.contains("Utwórz konto").should("exist");
    cy.get("#continue").click();
    cy.contains("Wystąpił błąd").should("exist");
  });
});
