import { test, expect } from "@playwright/test";

test.describe("Login validation test", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/");
  });

  test("Input invalid-email", async ({ page }) => {
    const emailInput = page.locator('input[type="email"]');
    await emailInput.fill("invaild-email");

    const passwordInput = page.locator('input[type="password"]');
    await passwordInput.fill("password");

    await page.click('button[type="submit"]');

    const errorMessage = await page.locator("#error-message");
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText(
      "メールアドレスとパスワードは必須です"
    );
  });

  test("Input blank email and password", async ({ page }) => {
    const emailInput = page.locator('input[type="email"]');
    await emailInput.fill("");

    const passwordInput = page.locator('input[type="password"]');
    await passwordInput.fill("");

    await page.click("button[type=submit]");

    const errorMessage = await page.locator("#error-message");
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText(
      "メールアドレスとパスワードは必須です"
    );
  });

  test("Input correct email and password", async ({ page }) => {
    const emailInput = page.locator('input[type="email"]');
    await emailInput.fill("test@example.com");

    const passwordInput = page.locator('input[type="password"]');
    await passwordInput.fill("password");

    await page.click('button[type="submit"]');

    const errorMessage = await page.locator("#error-message");
    await expect(errorMessage).toHaveCount(0);
  });
});
