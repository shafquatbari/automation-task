const { expect, driver } = require("@wdio/globals");
const LoginPage = require("../pageobjects/login.page");
const SecurePage = require("../pageobjects/secure.page");

describe("My Login application", () => {
  it("should login with valid credentials", async () => {
    //choose a button to click by accessibility id ios
    let standard_user = await $("~test-standard_user");
    await standard_user.click();
    driver.pause(2000);
    let loginButton = await $("~test-LOGIN");
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
    driver.pause(4000);
    // press cart button with xpath
    let cartButton = await $("//XCUIElementTypeOther[@name='test-Cart']");
    driver.pause(2000);
    await cartButton.click();
    //scroll to checkout button
    await driver.execute("mobile: scroll", { direction: "down" });
    driver.pause(2000);
    //click checkout button
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
    let postalCode = await $("~test-Postal Code");
    driver.pause(2000);
    await postalCode.setValue("12345");
    //click continue button
    let continueButton = await $("~test-CONTINUE");
    driver.pause(2000);
    await continueButton.click();
    //scroll to finish button
    await driver.execute("mobile: scroll", { direction: "down" });
    driver.pause(2000);
    //click finish button
    let finishButton = await $("~test-FINISH");
    driver.pause(2000);
    await finishButton.click();
    //assertion
    let completeHeader = await $("~test-THANK YOU FOR YOUR ORDER");
    driver.pause(2000);
    await expect(completeHeader).toBeDisplayed();
  });
});
