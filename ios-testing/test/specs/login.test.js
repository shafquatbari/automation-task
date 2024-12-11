const LoginPage = require("../pageobjects/login.page");
const ProductPage = require("../pageobjects/product.page");
const CheckoutPage = require("../pageobjects/checkout.page");
const HomePage = require("../pageobjects/home.page");
const Actions = require("../actions/actions");

describe("E-Commerce Flow", () => {
  it("should successfully complete a purchase", async () => {
    // Login
    await LoginPage.login("standard_user", "secret_sauce");

    // Add products to cart
    await Actions.scroll("down");
    await ProductPage.addProductToCart(4);
    await Actions.scroll("up");
    await ProductPage.addProductToCart(0);

    // Go to cart and proceed to checkout
    await ProductPage.goToCart();
    const checkoutButton = await $("~test-CHECKOUT");
    await checkoutButton.click();

    // Fill checkout details
    await CheckoutPage.fillShippingDetails("Shafquat", "Bari", "12345");
    await Actions.hideKeyboard();
    await CheckoutPage.completeCheckout();

    // Verify and return to home
    await CheckoutPage.returnToHome();
    await HomePage.verifyHomePageDisplayed();
  });
});
