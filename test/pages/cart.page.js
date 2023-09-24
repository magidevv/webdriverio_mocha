import Page from "./page.js";

class CartPage extends Page {
  get itemName() {
    return $$(".inventory_item_name");
  }
  get cartItem() {
    return $$(".cart_item");
  }
  get checkoutBtn() {
    return $("#checkout");
  }
  get errorMsg() {
    return $("#cart_contents_container");
  }

  async pageCheck(browser) {
    await expect(browser).toHaveUrlContaining("cart");
  }

  async cartCheck() {
    await expect(this.cartItem).toBeDisplayed();
    await expect(this.itemName).toHaveText("Sauce Labs Backpack");
  }

  async emptyCartCheck() {
    await expect(this.itemName).not.toExist();
  }

  async checkoutPage() {
    await expect(this.checkoutBtn).toHaveText("Checkout");
    await this.checkoutBtn.click();
  }

  async emptyCartErrorMsg() {
    await expect(this.errorMsg).toHaveText("Cart is empty");
  }
}

export default new CartPage();
