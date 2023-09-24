import Page from "./page.js";
import { browser } from "@wdio/globals";

class InventoryPage extends Page {
  get inventoryTitle() {
    return $(".title");
  }
  get cartLink() {
    return $('a[class="shopping_cart_link"]');
  }
  get burgerBtn() {
    return $("#react-burger-menu-btn");
  }
  get burgerMenu() {
    return $(".bm-menu-wrap");
  }
  get bmItems() {
    return $$(".bm-item.menu-item");
  }
  get logoutBtn() {
    return $("#logout_sidebar_link");
  }
  get itemName() {
    return $(".inventory_item_name");
  }
  get addToCartBtn() {
    return $("#add-to-cart-sauce-labs-backpack");
  }
  get removeFromCartBtn() {
    return $("#remove-sauce-labs-backpack");
  }
  get cartBadge() {
    return $(".shopping_cart_badge");
  }
  get cartLink() {
    return $(".shopping_cart_link");
  }
  get sortList() {
    return $(".product_sort_container");
  }
  get productList() {
    return $("#inventory_container");
  }
  get products() {
    return $$(".inventory_item");
  }
  get productPrices() {
    return $$(".inventory_item_price");
  }
  get productNames() {
    return $$(".inventory_item_name");
  }
  get twLink() {
    return $("li.social_twitter a");
  }
  get fbLink() {
    return $("li.social_facebook a");
  }
  get inLink() {
    return $("li.social_linkedin a");
  }

  async pageCheck(browser) {
    await expect(browser).toHaveUrlContaining("inventory");
  }

  async titleDisplay(title) {
    await expect(this.inventoryTitle).toBeDisplayed();
    await expect(this.inventoryTitle).toHaveText(title);
  }

  async productsDisplay() {
    await expect(this.products).toBeDisplayed();
  }

  async cartDisplay() {
    await expect(this.cartLink).toBeDisplayed();
  }

  async logout() {
    await this.burgerBtn.click();
    await expect(this.burgerMenu).toBeDisplayed();
    const bmItems = await this.bmItems;
    if (bmItems.length !== 4) {
      throw new Error(`Expected 4 elements, but found ${bmItems.length}`);
    }
    await expect(this.logoutBtn).toHaveText("Logout");
    await this.logoutBtn.click();
  }

  async addToCart() {
    await expect(this.itemName).toHaveText("Sauce Labs Backpack");
    await expect(this.addToCartBtn).toHaveText("Add to cart");
    await this.addToCartBtn.click();
    await expect(this.cartBadge).toBeDisplayed();
    await expect(this.cartBadge).toHaveText("1");
  }

  async productRemove() {
    await expect(this.removeFromCartBtn).toHaveText("Remove");
    await this.removeFromCartBtn.click();
  }

  async cartPage() {
    await this.cartLink.click();
  }

  async sortLoHi() {
    await this.sortList.selectByAttribute("value", "lohi");
    const priceElements = await this.productPrices;
    const priceTexts = await Promise.all(
      priceElements.map(async (element) => {
        return await element.getText();
      })
    );

    const pricesAsNumbers = priceTexts.map((priceText) =>
      parseFloat(priceText.replace("$", ""))
    );
    const sortedPrices = [...pricesAsNumbers].sort((a, b) => a - b);

    for (let i = 0; i < pricesAsNumbers.length; i++) {
      if (pricesAsNumbers[i] !== sortedPrices[i]) {
        throw new Error(
          `Product prices are not sorted in ascending order, expected ${sortedPrices[i]}, but found ${pricesAsNumbers[i]}`
        );
      }
    }
  }

  async sortHiLo() {
    await this.sortList.selectByAttribute("value", "hilo");
    const priceElements = await this.productPrices;
    const priceTexts = await Promise.all(
      priceElements.map(async (element) => {
        return await element.getText();
      })
    );

    const pricesAsNumbers = priceTexts.map((priceText) =>
      parseFloat(priceText.replace("$", ""))
    );
    const sortedPrices = [...pricesAsNumbers].sort((a, b) => b - a);

    for (let i = 0; i < pricesAsNumbers.length; i++) {
      if (pricesAsNumbers[i] !== sortedPrices[i]) {
        throw new Error(
          `Product prices are not sorted in descending order, expected ${sortedPrices[i]}, but found ${pricesAsNumbers[i]}`
        );
      }
    }
  }

  async sortAZ() {
    await this.sortList.selectByAttribute("value", "az");
    const productNameElements = await this.productNames;
    const productNames = await Promise.all(
      productNameElements.map(async (element) => {
        return await element.getText();
      })
    );

    const sortedProductNames = [...productNames].sort();

    for (let i = 0; i < productNames.length; i++) {
      if (productNames[i] !== sortedProductNames[i]) {
        throw new Error(
          `Product names are not sorted in A-Z order, expected ${sortedProductNames[i]}, but found ${productNames[i]}`
        );
      }
    }
  }

  async sortZA() {
    await this.sortList.selectByAttribute("value", "za");
    const productNameElements = await this.productNames;
    const productNames = await Promise.all(
      productNameElements.map(async (element) => {
        return await element.getText();
      })
    );

    const sortedProductNames = [...productNames].sort().reverse();

    for (let i = 0; i < productNames.length; i++) {
      if (productNames[i] !== sortedProductNames[i]) {
        throw new Error(
          `Product names are not sorted in Z-A order, expected ${sortedProductNames[i]}, but found ${productNames[i]}`
        );
      }
    }
  }

  async socialLinks() {
    const links = [this.twLink, this.fbLink, this.inLink];
    const expectedUrls = [
      "https://twitter.com/saucelabs",
      "https://www.facebook.com/saucelabs",
      "https://www.linkedin.com/company/sauce-labs/",
    ];

    for (let i = 0; i < links.length; i++) {
      await expect(links[i]).toBeDisplayed();
      await links[i].click();

      const handles = await browser.getWindowHandles();
      await browser.switchToWindow(handles[1]);

      const currentUrl = await browser.getUrl();

      if (currentUrl !== expectedUrls[i]) {
        throw new Error(
          `Expected URL to be ${expectedUrls[i]} but found ${currentUrl}.`
        );
      }

      await browser.closeWindow();
      await browser.switchToWindow(handles[0]);
    }
  }
}

export default new InventoryPage();
