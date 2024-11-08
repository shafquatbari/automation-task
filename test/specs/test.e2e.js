import { expect } from "@wdio/globals";

//Scenario 1: Verify Locked Out User
// Scenario 1: Verify Locked Out User
describe("Verify Locked Out User", () => {
  it("should display an error message for a locked-out user", async () => {
    // Use activateApp instead of execute for activating the app
    await driver.activateApp("com.swaglabsmobileapp");

    // Use accessibility id to locate the elements
    const usernameField = await $('~test-Username');
    const passwordField = await $('~test-Password');
    const loginButton = await $('~test-LOGIN');

    await usernameField.setValue("locked_out_user"); // Example value
    await passwordField.setValue("secret_sauce"); // Example value
    await loginButton.click();

    // Assert the locked-out error message
    const errorMessage = await $(
      'android=new UiSelector().text("Sorry, this user has been locked out.")'
    );
    await expect(errorMessage).toBeDisplayed();
  });
});
