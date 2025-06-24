import { test, expect } from "@playwright/test";
test.describe("Locator filters", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/");
  });

  test("Adding new Articles", async ({ page }) => {
    //Arrange

    const dropDownButton = page.getByTestId("btn-dropdown");
    const userButton = page.locator("#loginBtn");
    const emailInput = "Dominik@testowy.pl";
    const passwordInput = "Supermocnehaslo1!";

    const articlesButton = page.getByTestId("open-articles");
    const newArticleButton = page.locator("#add-new");
    const titleInput = page.getByTestId("title-input");
    const newArticleBody = page.locator("#body");
    const titleText = "Nowy artykuł testowy";
    const bodyText = "Pyszne wtorkowe testy";

    const newArticlePlace = page.getByTestId("article-63");

    //Act
    await dropDownButton.click();
    await userButton.click();
    await page.locator("input#username").fill(emailInput);
    await page.locator("input#password").fill(passwordInput);
    await page.getByRole("button", { name: "Login" }).click();

    await articlesButton.click();
    await newArticleButton.click();
    await titleInput.fill(titleText);
    await newArticleBody.fill(bodyText);
    await page.getByRole("button", { name: "Save" }).click();
    await articlesButton.click();

    //Assert
    await expect(newArticlePlace).toBeVisible();
    await expect(
      page.locator('a[href="article.html?id=63"]', {
        hasText: titleText,
      })
    ).toBeVisible();
    await expect(page).toHaveURL("http://localhost:3000/articles.html");
  });
});
