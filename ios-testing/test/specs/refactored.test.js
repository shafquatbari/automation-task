// Page Objects
class LoginPage {
  get usernameField() {
    return $("~test-Username");
  }

  get passwordField() {
    return $("~test-Password");
  }

  get loginButton() {
    return $("~test-LOGIN");
  }

  async login(username, password) {
    await driver.execute("mobile: scroll", { direction: "down" });
    await driver.execute("mobile: scroll", { direction: "up" });
    await this.usernameField.setValue(username);
    await this.passwordField.setValue(password);
    await this.loginButton.click();
    await expect(this.loginButton).not.toBeDisplayed();
  }
}

class ProductPage {
  get addToCartButtonFirstItem() {
    return $("(//XCUIElementTypeOther[@name='test-ADD TO CART'])[5]");
  }

  get addToCartButtonSecondItem() {
    return $("//XCUIElementTypeOther[@name='test-ADD TO CART']");
  }

  get firstItemPrice() {
    return $(
      '//XCUIElementTypeStaticText[@name="test-Price" and @label="$7.99"]'
    );
  }

  get secondItemTitle() {
    return $(
      "//XCUIElementTypeStaticText[@name='test-Item title' and @label='Sauce Labs Bike Light']"
    );
  }

  get secondItemPrice() {
    return $("//XCUIElementTypeStaticText[@name='test-Price']");
  }

  async addFirstItemToCart() {
    const priceText = await this.firstItemPrice.getText();
    const priceWithoutDollar = priceText.replace("$", "");
    await driver.execute("mobile: scroll", { direction: "down" });
    await this.addToCartButtonFirstItem.click();
    await driver.pause(2000);
    return parseFloat(priceWithoutDollar);
  }

  async addSecondItemToCart() {
    await driver.execute("mobile: scroll", { direction: "up" });
    await this.secondItemTitle.click();
    await driver.execute("mobile: scroll", { direction: "down" });
    await this.addToCartButtonSecondItem.click();

    const priceText = await this.secondItemPrice.getText();
    const priceWithoutDollar = priceText.replace("$", "");
    return parseFloat(priceWithoutDollar);
  }
}

class CartPage {
  get cartButton() {
    return $("~test-Cart");
  }

  get checkoutButton() {
    return $("~test-CHECKOUT");
  }

  async proceedToCheckout() {
    await this.cartButton.click();
    await driver.execute("mobile: scroll", { direction: "down" });
    await this.checkoutButton.click();
  }
}

class CheckoutPage {
  get firstNameField() {
    return $("~test-First Name");
  }

  get lastNameField() {
    return $("~test-Last Name");
  }

  get postalCodeField() {
    return $("~test-Zip/Postal Code");
  }

  get continueButton() {
    return $("~test-CONTINUE");
  }

  async fillCheckoutDetails(firstName, lastName, postalCode) {
    await this.firstNameField.setValue(firstName);
    await this.lastNameField.setValue(lastName);
    await this.postalCodeField.setValue(postalCode);
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
    await this.continueButton.click();
  }

  async verifyTotalPrice(expectedTotalPrice) {
    await driver.execute("mobile: scroll", { direction: "down" });
    await driver.pause(2000);
    const total = await $(`~Item total: $${expectedTotalPrice}`);
    await expect(total).toBeDisplayed();
  }
}

class OrderCompletionPage {
  get finishButton() {
    return $("//XCUIElementTypeOther[@name='test-FINISH']");
  }

  get backHomeButton() {
    return $("~test-BACK HOME");
  }

  get productsHeader() {
    return $("//XCUIElementTypeStaticText[@name='PRODUCTS']");
  }

  async completeOrder() {
    await this.finishButton.click();
    await driver.pause(2000);
    await this.backHomeButton.click();
    await expect(this.productsHeader).toBeDisplayed();
  }
}

class SortPage {
  get toggleViewButton() {
    return $("~test-Toggle");
  }

  get modalSelectorButton() {
    return $("~test-Modal Selector Button");
  }

  get priceLowToHighOption() {
    return $("~Price (low to high)");
  }

  get firstProductAddButton() {
    return $("(//XCUIElementTypeOther[@name='test-ADD TO CART'])[6]");
  }

  get secondProductAddButton() {
    return $("(//XCUIElementTypeOther[@name='test-ADD TO CART'])[1]");
  }

  get cartItemCount() {
    return $("(//XCUIElementTypeOther[@name='2'])[3]");
  }

  async sortByPrice() {
    await this.toggleViewButton.click();
    await driver.pause(2000);
    await this.modalSelectorButton.click();
    await driver.pause(2000);
    await this.priceLowToHighOption.click();
    await driver.pause(2000);
  }

  async addFirstProductToCart() {
    await this.firstProductAddButton.click();
    await driver.execute("mobile: scroll", { direction: "up" });
    await driver.pause(2000);
  }

  async addSecondProductToCart() {
    await this.secondProductAddButton.click();
    await driver.pause(2000);
  }

  async verifyCartItemCount() {
    await expect(this.cartItemCount).toBeDisplayed();
  }
}

// Tests
const loginPage = new LoginPage();
const productPage = new ProductPage();
const cartPage = new CartPage();
const checkoutPage = new CheckoutPage();
const orderCompletionPage = new OrderCompletionPage();
const sortPage = new SortPage();

let totalPrice = 0;

describe("Login Suite", () => {
  it("should login with valid credentials", async () => {
    await loginPage.login("standard_user", "secret_sauce");
  });
});

describe("Add to Cart Suite", () => {
  it("should add first item to cart and verify price", async () => {
    totalPrice += await productPage.addFirstItemToCart();
    await expect(totalPrice).toBe(7.99);
  });

  it("should add second item to cart and update total price", async () => {
    totalPrice += await productPage.addSecondItemToCart();
    await expect(totalPrice).toBe(17.98);
  });
});

describe("Checkout Suite", () => {
  it("should checkout and verify total price", async () => {
    await cartPage.proceedToCheckout();
    await checkoutPage.fillCheckoutDetails("Shafquat", "Bari", "12345");
    await checkoutPage.verifyTotalPrice(totalPrice);
  });
});

describe("Completion Suite", () => {
  it("should complete the order and return to home screen", async () => {
    await orderCompletionPage.completeOrder();
  });
});

describe("Sort Suite", () => {
  it("should sort the products by price and add items to cart", async () => {
    await sortPage.sortByPrice();
    await sortPage.addFirstProductToCart();
    await sortPage.addSecondProductToCart();
    await sortPage.verifyCartItemCount();
  });
});
