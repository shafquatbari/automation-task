class HomePage {
  get productsHeader() {
    return $("//XCUIElementTypeStaticText[@name='PRODUCTS']");
  }

  async verifyHomePageDisplayed() {
    await expect(this.productsHeader).toBeDisplayed();
  }
}

module.exports = new HomePage();
