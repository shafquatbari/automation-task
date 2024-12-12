const { expect, driver } = require("@wdio/globals");

let totalprice = 0;

describe("Login Suite", () => {
  it("should login with valid credentials", async () => {
    let username = await $("~test-Username");
    await driver.execute("mobile: scroll", { direction: "down" });
    await driver.execute("mobile: scroll", { direction: "up" });
    await username.setValue("standard_user");

    let password = await $("~test-Password");
    await password.setValue("secret_sauce");

    let loginButton = await $("~test-LOGIN");
    await loginButton.click();

    await expect(loginButton).not.toBeDisplayed();
  });
});

describe("Add to Cart Suite", () => {
  it("should add first item to cart and verify price", async () => {
    let addToCart = await $(
      "(//XCUIElementTypeOther[@name='test-ADD TO CART'])[5]"
    );
    let price = await $(
      `//XCUIElementTypeStaticText[@name="test-Price" and @label="$7.99"]`
    );
    let priceText = await price.getText();
    let priceWithoutDollar = priceText.replace("$", "");

    await driver.execute("mobile: scroll", { direction: "down" });
    await addToCart.click();
    await driver.pause(2000);

    await expect(price).toBeDisplayed();
    totalprice += parseFloat(priceWithoutDollar);
  });

  it("should add second item to cart and update total price", async () => {
    let sauceLabsBikeLight = await $(
      `//XCUIElementTypeStaticText[@name="test-Item title" and @label="Sauce Labs Bike Light"]`
    );
    await driver.execute("mobile: scroll", { direction: "up" });
    await sauceLabsBikeLight.click();

    let addToCart2 = await $(
      `//XCUIElementTypeOther[@name="test-ADD TO CART"]`
    );
    await driver.execute("mobile: scroll", { direction: "down" });
    await addToCart2.click();

    let price2 = await $(`//XCUIElementTypeStaticText[@name="test-Price"]`);
    let priceText2 = await price2.getText();
    let priceWithoutDollar2 = priceText2.replace("$", "");
    totalprice += parseFloat(priceWithoutDollar2);

    await expect(price2).toBeDisplayed();
  });
});

describe("Checkout Suite", () => {
  it("should checkout and verify total price", async () => {
    let cartButton = await $("~test-Cart");
    await cartButton.click();

    await driver.execute("mobile: scroll", { direction: "down" });

    let checkoutButton = await $("~test-CHECKOUT");
    await checkoutButton.click();

    let firstName = await $("~test-First Name");
    await firstName.setValue("Shafquat");

    let lastName = await $("~test-Last Name");
    await lastName.setValue("Bari");

    let postalCode = await $("~test-Zip/Postal Code");
    await postalCode.setValue("12345");

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
    await driver.execute("mobile: scroll", { direction: "down" });

    let continueButton = await $("~test-CONTINUE");
    await continueButton.click();
    await driver.execute("mobile: scroll", { direction: "down" });
    await driver.pause(2000);
    // find the locator for the total price
    let total = await $(`~Item total: $${totalprice}`);
    await expect(total).toBeDisplayed();
    await expect(17.98).toEqual(totalprice);
  });
});

describe("Completion Suite", () => {
  it("should complete the order and return to home screen", async () => {
    let finishButton = await $(`//XCUIElementTypeOther[@name="test-FINISH"]`);
    await driver.pause(2000);
    await finishButton.click();

    await driver.pause(2000);

    let backHome = await $("~test-BACK HOME");
    await backHome.click();

    let productsHeader = await $(
      `//XCUIElementTypeStaticText[@name="PRODUCTS"]`
    );
    await expect(productsHeader).toBeDisplayed();
  });
});

describe("Sort Suite", () => {
  it("should sort the products by price", async () => {
    let toggleViewButton = await $("~test-Toggle");
    await toggleViewButton.click();
    await driver.pause(2000);

    let modalSelector = await $("~test-Modal Selector Button");
    await modalSelector.click();
    await driver.pause(2000);

    let priceLowToHigh = await $("~Price (low to high)");
    await priceLowToHigh.click();
    await driver.pause(2000);

    let price1 = await $(
      `//XCUIElementTypeStaticText[@name="test-Price" and @label="$49.99"]`
    );

    let addButton1 = await $(
      `(//XCUIElementTypeOther[@name="test-ADD TO CART"])[6]`
    );

    await addButton1.click();

    await driver.execute("mobile: scroll", { direction: "up" });
    await driver.pause(2000);

    let price2 = await $(
      `//XCUIElementTypeStaticText[@name="test-Price" and @label="$7.99"]`
    );

    let addButton2 = await $(
      `(//XCUIElementTypeOther[@name="test-ADD TO CART"])[1]`
    );

    await addButton2.click();
    await driver.pause(2000);

    let cartNumbers = await $(`(//XCUIElementTypeOther[@name="2"])[3]`);
    await expect(cartNumbers).toBeDisplayed();
  });
});
