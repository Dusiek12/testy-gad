import { test, expect } from "@playwright/test";
test.describe("Locator filters", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/");
  });

    test("Moving from comment to article", async ({ page }) => {
      //Arrange

      const dropDownButton = page.getByTestId("btn-dropdown");
      const userButton = page.locator("#loginBtn");
      const emailInput = "Dominik@testowy.pl";
      const passwordInput = "Supermocnehaslo1!";

      const commentsPage = page.getByTestId("open-comments");
      const seeComentButton = page.locator("#gotoComment230");
      const articleInput = page.getByTestId("return");

      const articleTitle = page.getByTestId("article-title");

      //Act
      await dropDownButton.click();
      await userButton.click();
      await page.locator("input#username").fill(emailInput);
      await page.locator("input#password").fill(passwordInput);
      await page.getByRole("button", { name: "Login" }).click();

      await commentsPage.click();
      await seeComentButton.click();
      await articleInput.click();

        //Assert
        await expect(articleTitle).toHaveText("How to use Cucumber for behavior-driven development");
        await expect(page).toHaveURL("http://localhost:3000/article.html?id=48");
    });
  });

