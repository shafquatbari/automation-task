import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import SecurePage from '../pageobjects/secure.page.js'

describe("Sauce Demo App Login Test", () => {
  it("should login successfully with valid credentials", async () => {
    // Locate the username field and input text
    const usernameInput = await $("id:username-field-id"); // Replace with the actual ID
    await usernameInput.setValue("standard_user");

    // Locate the password field and input text
    const passwordInput = await $("id:password-field-id"); // Replace with the actual ID
    await passwordInput.setValue("secret_sauce");

    // Locate the login button and click it
    const loginButton = await $("id:login-button-id"); // Replace with the actual ID
    await loginButton.click();

    // Verify that the user is logged in by checking for a specific element
    const homeScreenElement = await $("id:home-screen-element-id"); // Replace with the actual ID
    await homeScreenElement.waitForDisplayed();
    expect(await homeScreenElement.isDisplayed()).toBe(true);
  });
});
