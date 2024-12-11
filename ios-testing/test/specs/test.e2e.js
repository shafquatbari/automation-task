const { expect, driver } = require("@wdio/globals");
const LoginPage = require("../pageobjects/login.page");
const SecurePage = require("../pageobjects/secure.page");

describe("My Login application", () => {
  it("should login with valid credentials", async () => {
    //Username box
    let username = await $("~test-Username");
    //Fill this with the collected username
    //scroll down and do nothing and then scroll up
    await driver.execute("mobile: scroll", { direction: "down" });
    await driver.execute("mobile: scroll", { direction: "up" });
    await username.setValue("standard_user");
    // Password box
    let password = await $("~test-Password");
    //Fill this with the collected password
    await password.setValue("secret_sauce");
    // Login button
    let loginButton = await $("~test-LOGIN");
    await loginButton.click();
    //scroll to the element if needed, with xpath
    let addToCart = await $(
      "(//XCUIElementTypeOther[@name='test-ADD TO CART'])[5]"
    );
    //scroll a bit more to center
    await driver.execute("mobile: scroll", { direction: "down" });
    await addToCart.click();
    //scroll to the element if needed, with xpath
    let sauceLabsBikeLight = await $(
      `//XCUIElementTypeStaticText[@name="test-Item title" and @label="Sauce Labs Bike Light"]`
    );
    //scroll a bit more to center
    await driver.execute("mobile: scroll", { direction: "up" });
    await sauceLabsBikeLight.click();
    //scroll to the element if needed, with xpath
    let addToCart2 = await $(
      `//XCUIElementTypeOther[@name="test-ADD TO CART"]`
    );
    //scroll a bit more to center
    await driver.execute("mobile: scroll", { direction: "down" });
    await addToCart2.click();
    // click the back button
    let backButton = await $("~test-BACK TO PRODUCTS");
    await backButton.click();
    //scroll up to find the cart button
    await driver.execute("mobile: scroll", { direction: "up" });
    // Find and click cart button with xpath
    let cartButton = await $("~test-Cart");
    await cartButton.click();
    // Find and click checkout button
    let checkoutButton = await $("~test-CHECKOUT");
    await checkoutButton.click();
    //enter first name
    let firstName = await $("~test-First Name");
    await firstName.setValue("Shafquat");
    //enter last name
    let lastName = await $("~test-Last Name");
    await lastName.setValue("Bari");
    //enter postal code
    let postalCode = await $("~test-Zip/Postal Code");
    await postalCode.setValue("12345");
    //press center of the screen to hide the keyboard
    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: 200, y: 200 },
          { type: "pointerDown" },
          { type: "pointerUp" },
        ],
      },
    ]);
    //click continue button
    let continueButton = await $("~test-CONTINUE");
    await continueButton.click();
    //scroll to finish button
    await driver.execute("mobile: scroll", { direction: "down" });
    //click finish button
    let finishButton = await $("~test-FINISH");
    await finishButton.click();
    //assertion
    let completeHeader = await $("~test-THANK YOU FOR YOUR ORDER");
    await expect(completeHeader).toBeDisplayed();
  });
});
