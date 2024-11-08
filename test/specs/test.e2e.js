import { expect } from "@wdio/globals";

// Scenario 1: Verify Locked Out User
describe("Verify Locked Out User", () => {
  it("should display an error message for a locked-out user", async () => {
    // Activate the app
    await driver.activateApp("com.swaglabsmobileapp");

    // Scroll to the element if needed
    await driver.execute("mobile: scroll", {
      strategy: "accessibility id",
      selector: "test-standard_user",
    });

    // Click the selector to auto-fill the fields
    const autoFillSelector = await $(
      'android=new UiSelector().text("locked_out_user")'
    );
    await autoFillSelector.click();

    // Scroll to the element if needed
    await driver.execute("mobile: scroll", {
      strategy: "accessibility id",
      selector: "test-Username",
    });

    // Click the login button
    const loginButton = await $("~test-LOGIN");
    await loginButton.click();

    // Assert the locked-out error message
    const errorMessage = await $(
      'android=new UiSelector().text("Sorry, this user has been locked out.")'
    );
    await expect(errorMessage).toBeDisplayed();
  });
});

