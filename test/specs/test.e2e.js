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
      strategy: "accessibility id",
      selector: "test-standard_user",
    });

    // Click the selector for "standard_user" to auto-fill the fields
    const autoFillSelector = await $(
      'android=new UiSelector().text("standard_user")'
    );
    await autoFillSelector.click();

    // Scroll to the login button
    await driver.execute("mobile: scroll", {
      strategy: "accessibility id",
      selector: "test-Username",
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

    // Scroll down to the "Add to Cart" button for Sauce Labs Fleece Jacket
    await driver.execute("mobile: scroll", {
      direction: "down",
      strategy: "-android uiautomator",
      selector: 'new UiSelector().text("Sauce Labs Fleece Jacket")',
    });

    const addToCartFleeceJacket = await $(
      'android=new UiSelector().description("test-ADD TO CART").instance(3)'
    );

    await addToCartFleeceJacket.click();

    // Store the price of the Sauce Labs Fleece Jacket
    const fleeceJacketPrice = await $(
      '//android.widget.TextView[@text="$49.99"]'
    ).getText();

    // Assert that the "Add to Cart" button changed to "Remove"
    const removeButton = await $(
      'android=new UiSelector().description("test-REMOVE")'
    );
    await expect(removeButton).toBeDisplayed();

    // Scroll to find the Sauce Labs Bike Light and store the price
    await driver.execute("mobile: scroll", {
      direction: "down",
      strategy: "-android uiautomator",
      selector: 'new UiSelector().text("$9.99")',
    });

    const bikeLightPriceElement = await $(
      'android=new UiSelector().text("$9.99")'
    );
    await bikeLightPriceElement.waitForDisplayed({ timeout: 5000 });
    const bikeLightPrice = await bikeLightPriceElement.getText();

    // Click on the Sauce Labs Bike Light product name
    const bikeLightName = await $(
      'android=new UiSelector().text("Sauce Labs Bike Light")'
    );
    await bikeLightName.click();

    // On the new page, scroll down to verify the price and name
    const bikeLightPriceOnPage = await $(
      'android=new UiSelector().text("$9.99")'
    ).getText();
    const bikeLightNameOnPage = await $(
      'android=new UiSelector().text("Sauce Labs Bike Light")'
    ).getText();

    // Assert the price and name on the product page
    expect(bikeLightPriceOnPage).toBe("$9.99");
    expect(bikeLightNameOnPage).toBe("Sauce Labs Bike Light");

    // Click the "Add to Cart" button for the Sauce Labs Bike Light
    const addToCartBikeLight = await $(
      'android=new UiSelector().description("test-ADD TO CART")'
    );
    await addToCartBikeLight.click();
  });
});
