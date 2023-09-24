import Page from "./page.js";

class CheckoutPage extends Page {
  get title() {
    return $(".title");
  }
  get firstNameInput() {
    return $("#first-name");
  }
  get lastNameInput() {
    return $("#last-name");
  }
  get postalCodeInput() {
    return $("#postal-code");
  }
  get continueBtn() {
    return $("#continue");
  }

  async pageCheck(browser) {
    await expect(browser).toHaveUrlContaining("checkout-step-one");
    await expect(this.title).toHaveTextContaining("Checkout");
  }

  async checkout(firstName, lastName, postalCode) {
    await this.firstNameInput.setValue(firstName);
    await this.lastNameInput.setValue(lastName);
    await this.postalCodeInput.setValue(postalCode);
    await expect(this.continueBtn).toHaveAttribute("value", "Continue");
    await this.continueBtn.click();
  }
}

export default new CheckoutPage();
