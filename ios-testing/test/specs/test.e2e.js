const { expect, driver } = require("@wdio/globals");
const LoginPage = require("../pageobjects/login.page");
const SecurePage = require("../pageobjects/checkout.page");

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
    let price = await $(
      `//XCUIElementTypeStaticText[@name="test-Price" and @label="$7.99"]`
    );
    let priceText = await price.getText();
    let priceWithoutDollar = priceText.replace("$", "");
    // assert the price
    //await expect(price).toBeDisplayed();
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
    let price2 = await $(`//XCUIElementTypeStaticText[@name="test-Price"]`);
    let priceText2 = await price2.getText();
    let priceWithoutDollar2 = priceText2.replace("$", "");
    let totalprice =
      parseFloat(priceWithoutDollar) + parseFloat(priceWithoutDollar2);
    // assert the price
    //await expect(price2).toBeDisplayed();
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
    //XCUIElementTypeStaticText[@name="Item total: ${totalprice}"] verify this
    // Assert that the total price is equal to 17.98
    // Assert with the xpath that is displayed
    // let total = await $(
    //   `//XCUIElementTypeStaticText[@name="Item total: $${totalprice}"]`
    // );
    // accessibility id: Item total: $17.98
    let total = await $(`~Item total: $${totalprice}`);
    await expect(17.98).toEqual(totalprice); // this works
    //click finish button with Xpath
    let finishButton = await $(`//XCUIElementTypeOther[@name="test-FINISH"]`);
    driver.pause(2000);
    await finishButton.click();
    //assertion
    //let completeHeader = await $("~test-THANK YOU FOR YOUR ORDER");
    ///await expect(completeHeader).toBeDisplayed();
    //back home button
    let backHome = await $("~test-BACK HOME");
    await backHome.click();
    //assertion, Xpath
    let productsHeader = await $(
      `//XCUIElementTypeStaticText[@name="PRODUCTS"]`
    );
    await expect(productsHeader).toBeDisplayed();
  });
});
