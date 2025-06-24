import { test, expect } from "@playwright/test";
test.describe("Locator filters", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/");
  });
  test("Register and login user", async ({ page }) => {
    //Arrange
    const randomEmail = `user_${Date.now()}@test.pl`;
    const password = "Supermocnehaslo1!";
    const firstname = "DominikTesty";
    const lastname = "Testowy";
    const birthdate = "1990-01-01";

    const dropDownButton = page.getByTestId("btn-dropdown");
    const userButton = page.locator("#registerBtn");
    const firstNameInput = page.getByTestId("firstname-input");
    const lastNameInput = page.getByTestId("lastname-input");
    const emailInput = page.getByTestId("email-input");
    const birthdateInput = page.getByTestId("birthdate-input");
    const dateLocator = page.locator(
      'td[data-month="9"][data-year="1995"] >> a',
      { hasText: "10" }
    );
    const passwordInput = page.getByTestId("password-input");
    const registerButton = page.getByRole("button", { name: "Register" });

    const emailInputButton = page.locator("input#username");
    const passwordInputButton = page.locator("input#password");

    const hiUserText = page.getByTestId("hello");
    const sessionTimer = page.getByTestId("countDown");

    //Act
    await dropDownButton.click();
    await userButton.click();
    await firstNameInput.fill(firstname);
    await lastNameInput.fill(lastname);
    await emailInput.fill(randomEmail);
    await birthdateInput.fill(birthdate);
    await dateLocator.click();
    await passwordInput.fill(password);
    await registerButton.click();

    await page.waitForURL("**/login/");

    await emailInputButton.fill(randomEmail);
    await passwordInputButton.fill(password);
    await page.getByRole("button", { name: "Login" }).click();


    //Assert
    await expect(hiUserText).toHaveText(`Hi ${randomEmail}!`);
    await expect(page).toHaveURL("http://localhost:3000/welcome");
    await expect(sessionTimer).toBeVisible();
  });
});
