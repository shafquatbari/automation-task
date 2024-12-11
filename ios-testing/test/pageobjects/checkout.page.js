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

  get finishButton() {
    return $("//XCUIElementTypeOther[@name='test-FINISH']");
  }

  get backHomeButton() {
    return $("~test-BACK HOME");
  }

  async fillShippingDetails(firstName, lastName, postalCode) {
    await this.firstNameField.setValue(firstName);
    await this.lastNameField.setValue(lastName);
    await this.postalCodeField.setValue(postalCode);
  }

  async completeCheckout() {
    await this.continueButton.click();
    await this.finishButton.click();
  }

  async returnToHome() {
    await this.backHomeButton.click();
  }
}

module.exports = new CheckoutPage();
