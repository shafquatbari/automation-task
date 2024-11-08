import { expect } from "@wdio/globals";

// // Scenario 1: Verify Locked Out User
// describe("Verify Locked Out User", () => {
//   it("should display an error message for a locked-out user", async () => {
//     // Activate the app
//     await driver.activateApp("com.swaglabsmobileapp");

//     // Scroll to the element if needed
//     await driver.execute("mobile: scroll", {
//       strategy: "accessibility id",
//       selector: "test-standard_user",
//     });

//     // Click the selector to auto-fill the fields
//     const autoFillSelector = await $(
//       'android=new UiSelector().text("locked_out_user")'
//     );
//     await autoFillSelector.click();

//     // Scroll to the element if needed
//     await driver.execute("mobile: scroll", {
//       strategy: "accessibility id",
//       selector: "test-Username",
//     });

//     // Click the login button
//     const loginButton = await $("~test-LOGIN");
//     await loginButton.click();

//     // Assert the locked-out error message
//     const errorMessage = await $(
//       'android=new UiSelector().text("Sorry, this user has been locked out.")'
//     );
//     await expect(errorMessage).toBeDisplayed();
//   });
// });

// Scenario 2: Sign in as Standard User
describe("Sign in as Standard User", () => {
  it("should sign in successfully and navigate to the home page", async () => {
    // Activate the app
    await driver.activateApp("com.swaglabsmobileapp");

    // Scroll to the element if needed
    await driver.execute("mobile: scroll", {
      direction: "down",
      strategy: "-android uiautomator",
      selector: `new UiSelector().description("test-standard_user")`,
    });

    // Click the selector for "standard_user" to auto-fill the fields
    const autoFillSelector = await $(
      'android=new UiSelector().text("standard_user")'
    );
    await autoFillSelector.click();

    // Scroll to the login button
    await driver.execute("mobile: scroll", {
      direction: "up",
      strategy: "-android uiautomator",
      selector: `new UiSelector().text("Username")`,
    });

    // Click the login button
    const loginButton = await $("~test-LOGIN");
    await loginButton.click();

    // Assert that we have navigated to the new page
    const uniqueElementOnHomePage = await $(
      'android=new UiSelector().className("android.widget.ImageView").instance(6)'
    );
    await expect(uniqueElementOnHomePage).toBeDisplayed();

    // Click the filter button
    const filterButton = await $(
      'android=new UiSelector().description("test-Modal Selector Button")'
    );
    await filterButton.click();

    // Click the "Price (low to high)" option
    const priceLowToHigh = await $(
      'android=new UiSelector().text("Price (low to high)")'
    );
    await priceLowToHigh.click();

    // Click the "Add to Cart" button for first product
    const addToCartProductOne = await $(
      'android=new UiSelector().description("test-ADD TO CART").instance(1)'
    );

    await addToCartProductOne.click();

    // Store the price of the first product
    const ProductOnePrice = await $(
      '//android.widget.TextView[@text="$9.99"]'
    ).getText();

    //Assert that the "Add to Cart" button changed to "Remove"
    const removeButton = await $(
      'android=new UiSelector().description("test-REMOVE")'
    );
    await expect(removeButton).toBeDisplayed();

    const productTwoName = await $(
      'android=new UiSelector().text("Sauce Labs Onesie")'
    );
    await productTwoName.click();

    await driver.pause(2000);
    //Scroll down to find the "Add to Cart" button for the Sauce Labs Bike Light
    await driver.execute("mobile: scroll", {
      //android ui automator
      direction: "down",
      strategy: "-android uiautomator",
      selector: `new UiSelector().text("ADD TO CART")`,
    });
    await driver.pause(2000);

    // Click the "Add to Cart" button
    const addToCartProductTwo = await $("~test-ADD TO CART");
    await addToCartProductTwo.click();

    const cartIcon = await $("~test-Cart");
    await cartIcon.click();

    //wait for the cart page to load, pause function
    await driver.pause(2000);

    //Scroll down to
    await driver.execute("mobile: scroll", {
      //android ui automator
      direction: "down",
      strategy: "-android uiautomator",
      selector: `new UiSelector().text("CHECKOUT")`,
    });

    await driver.pause(2000);

    //Click the checkout button
    const checkoutButton = await $("~test-CHECKOUT");
    await checkoutButton.click();

    await driver.pause(2000);

    //Enter the first name
    const firstName = await $("~test-First Name");
    await firstName.setValue("John");

    //Enter the last name
    const lastName = await $("~test-Last Name");
    await lastName.setValue("Doe");

    //Enter the postal code
    const postalCode = await $("~test-Zip/Postal Code");
    await postalCode.setValue("12345");

    await driver.pause(2000);

    //Click the continue button
    const continueButton = await $("~test-CONTINUE");
    await continueButton.click();

    await driver.pause(2000);

    //scroll down to find the finish button
    await driver.execute("mobile: scroll", {
      //android ui automator
      direction: "down",
      strategy: "-android uiautomator",
      selector: `new UiSelector().text("FINISH")`,
    });

    //Click the finish button
    const finishButton = await $("~test-FINISH");
    await finishButton.click();

    await driver.pause(2000);
  });
});
