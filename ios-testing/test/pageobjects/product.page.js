class ProductPage {
    get addToCartButtons() {
      return $$("//XCUIElementTypeOther[@name='test-ADD TO CART']");
    }
  
    get cartButton() {
      return $("~test-Cart");
    }
  
    async addProductToCart(index) {
      const productButton = this.addToCartButtons[index];
      await productButton.scrollIntoView({ block: "center" });
      await productButton.click();
    }
  
    async goToCart() {
      await this.cartButton.click();
    }
  }
  
  module.exports = new ProductPage();
  