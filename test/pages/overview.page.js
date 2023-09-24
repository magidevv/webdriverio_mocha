import Page from "./page.js";

class OverviewPage extends Page {
  get title() {
    return $(".title");
  }
  get itemName() {
    return $$(".inventory_item_name");
  }
  get cartItem() {
    return $$(".cart_item");
  }
  get finishBtn() {
    return $("#finish");
  }
  get productPrice() {
    return $(".summary_subtotal_label");
  }

  async pageCheck(browser) {
    await expect(browser).toHaveUrlContaining("checkout-step-two");
    await expect(this.title).toHaveTextContaining("Overview");
  }

  async productsCheck() {
    await expect(this.cartItem).toBeDisplayed();
    await expect(this.itemName).toHaveText("Sauce Labs Backpack");
    await expect(this.productPrice).toHaveTextContaining("29.99");
    await expect(this.finishBtn).toHaveText("Finish");
    await this.finishBtn.click();
  }
}

export default new OverviewPage();
