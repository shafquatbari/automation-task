const { expect, driver } = require("@wdio/globals");
const LoginPage = require("../pageobjects/login.page");
const SecurePage = require("../pageobjects/secure.page");

describe("My Login application", () => {
  it("should login with valid credentials", async () => {
    //choose a button to click by accessibility id ios
    //Username box
    let username = await $("~test-Username");
    //Fill this with the collected username
    //scroll down and do nothing and then scroll up
    driver.pause(2000);
    await driver.execute("mobile: scroll", { direction: "down" });
    driver.pause(2000);
    await driver.execute("mobile: scroll", { direction: "up" });
    driver.pause(2000);
    await username.setValue("standard_user");
    driver.pause(2000);
    // Password box
    let password = await $("~test-Password");
    driver.pause(2000);
    //Fill this with the collected password
    await password.setValue("secret_sauce");
    // Login button
    let loginButton = await $("~test-LOGIN");
    driver.pause(2000);
    await loginButton.click();
    driver.pause(2000);
    //scroll to the element if needed, with xpath
    let addToCart = await $(
      "(//XCUIElementTypeOther[@name='test-ADD TO CART'])[5]"
    );
    driver.pause(2000);
    //scroll a bit more to center
    await driver.execute("mobile: scroll", { direction: "down" });
    driver.pause(2000);
    await addToCart.click();
    driver.pause(4000);
    //scroll to the element if needed, with xpath
    let sauceLabsBikeLight = await $(
      `//XCUIElementTypeStaticText[@name="test-Item title" and @label="Sauce Labs Bike Light"]`
    );
    driver.pause(2000);
    //scroll a bit more to center
    await driver.execute("mobile: scroll", { direction: "up" });
    driver.pause(2000);
    await sauceLabsBikeLight.click();
    driver.pause(2000);
    //scroll to the element if needed, with xpath
    let addToCart2 = await $(
      `//XCUIElementTypeOther[@name="test-ADD TO CART"]`
    );
    //scroll a bit more to center
    await driver.execute("mobile: scroll", { direction: "down" });
    driver.pause(2000);
    await addToCart2.click();
    // click the back button
    let backButton = await $("~test-BACK TO PRODUCTS");
    driver.pause(2000);
    await backButton.click();
    driver.pause(6000);
    //scroll up to find the cart button
    await driver.execute("mobile: scroll", { direction: "up" });
    // Find and click cart button with xpath
    let cartButton = await $("~test-Cart");
    driver.pause(4000);
    await cartButton.click();
    driver.pause(2000);
    // Find and click checkout button
    let checkoutButton = await $("~test-CHECKOUT");
    driver.pause(2000);
    await checkoutButton.click();
    //enter first name
    let firstName = await $("~test-First Name");
    driver.pause(2000);
    await firstName.setValue("Shafquat");
    //enter last name
    let lastName = await $("~test-Last Name");
    driver.pause(2000);
    await lastName.setValue("Bari");
    //enter postal code
    let postalCode = await $("~test-Zip/Postal Code");
    driver.pause(2000);
    await postalCode.setValue("12345");
    //press center of the screen to hide the keyboard
    await driver.hideKeyboard();
    driver.pause(3000);
    //click continue button
    let continueButton = await $("~test-CONTINUE");
    driver.pause(3000);
    await continueButton.click();
    driver.pause(3000);
    //scroll to finish button
    await driver.execute("mobile: scroll", { direction: "down" });
    driver.pause(3000);
    //click finish button
    let finishButton = await $("~test-FINISH");
    driver.pause(3000);
    await finishButton.click();
    //assertion
    let completeHeader = await $("~test-THANK YOU FOR YOUR ORDER");
    driver.pause(3000);
    await expect(completeHeader).toBeDisplayed();
  });
});
