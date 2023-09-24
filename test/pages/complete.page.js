import Page from "./page.js";

class CompletePage extends Page {
  get title() {
    return $(".title");
  }
  get completeMsg() {
    return $(".complete-header");
  }
  get backBtn() {
    return $("#back-to-products");
  }

  async pageCheck(browser) {
    await expect(browser).toHaveUrlContaining("checkout-complete");
    await expect(this.title).toHaveTextContaining("Complete");
    await expect(this.completeMsg).toBeDisplayed();
    await expect(this.completeMsg).toHaveText("Thank you for your order!");
    await expect(this.backBtn).toHaveText("Back Home");
    await this.backBtn.click();
  }
}

export default new CompletePage();
