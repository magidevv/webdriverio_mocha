import LoginPage from "../pages/login.page.js";
import InventoryPage from "../pages/inventory.page.js";
import CartPage from "../pages/cart.page.js";
import CheckoutPage from "../pages/checkout.page.js";
import OverviewPage from "../pages/overview.page.js";
import CompletePage from "../pages/complete.page.js";
import { browser } from "@wdio/globals";

describe("Login", () => {
  it("Login with valid credentials", async () => {
    await LoginPage.open();

    await LoginPage.login("standard_user", "secret_sauce");
    await InventoryPage.pageCheck(browser);
    await InventoryPage.titleDisplay("Products");
    await InventoryPage.productsDisplay();
    await InventoryPage.cartDisplay();
  });
  it("Login with invalid password", async () => {
    await LoginPage.open();

    await LoginPage.login("standard_user", "secret_spice");
    await LoginPage.xIconsDisplay();
    await LoginPage.redHighlight();
    await LoginPage.errorMsgDisplay(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });
  it("Login with invalid login", async () => {
    await LoginPage.open();

    await LoginPage.login("standarD_user", "secret_sauce");
    await LoginPage.xIconsDisplay();
    await LoginPage.redHighlight();
    await LoginPage.errorMsgDisplay(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });
  it("Logout", async () => {
    await LoginPage.open();
    await LoginPage.login("standard_user", "secret_sauce");
    await InventoryPage.pageCheck(browser);

    await InventoryPage.logout();
    await LoginPage.pageCheck(browser);
    await LoginPage.afterLogout();
  });
});

describe("Cart", () => {
  it("Saving the cart after logout", async () => {
    await LoginPage.open();
    await LoginPage.login("standard_user", "secret_sauce");
    await InventoryPage.pageCheck(browser);

    await InventoryPage.addToCart();
    await InventoryPage.logout();
    await LoginPage.pageCheck(browser);
    await LoginPage.afterLogout();
    await LoginPage.login("standard_user", "secret_sauce");
    await InventoryPage.pageCheck(browser);
    await InventoryPage.titleDisplay("Products");
    await InventoryPage.productsDisplay();
    await InventoryPage.cartDisplay();
    await InventoryPage.cartPage();
    await CartPage.pageCheck(browser);
    await CartPage.cartCheck();

    await InventoryPage.productRemove();
  });
});

describe("Products", () => {
  it("Sorting", async () => {
    await LoginPage.open();
    await LoginPage.login("standard_user", "secret_sauce");
    await InventoryPage.pageCheck(browser);

    await InventoryPage.sortLoHi();
    await InventoryPage.sortHiLo();
    await InventoryPage.sortAZ();
    await InventoryPage.sortZA();
  });
});

describe("Footer", () => {
  it("Footer Links", async () => {
    await LoginPage.open();
    await LoginPage.login("standard_user", "secret_sauce");
    await InventoryPage.pageCheck(browser);

    await InventoryPage.socialLinks();
  });
});

describe("Checkout", () => {
  it("Valid Checkout", async () => {
    await LoginPage.open();
    await LoginPage.login("standard_user", "secret_sauce");
    await InventoryPage.pageCheck(browser);

    await InventoryPage.addToCart();
    await InventoryPage.cartPage();
    await CartPage.pageCheck(browser);
    await CartPage.cartCheck();
    await CartPage.checkoutPage();
    await CheckoutPage.pageCheck(browser);
    await CheckoutPage.checkout("Elona", "Musk", "00000");
    await OverviewPage.pageCheck(browser);
    await OverviewPage.productsCheck();
    await CompletePage.pageCheck(browser);
    await InventoryPage.pageCheck(browser);
    await InventoryPage.titleDisplay("Products");
    await InventoryPage.productsDisplay();
    await InventoryPage.cartPage();
    await CartPage.pageCheck(browser);
    await CartPage.emptyCartCheck();
  });

  it("Checkout without products", async () => {
    await LoginPage.open();
    await LoginPage.login("standard_user", "secret_sauce");
    await InventoryPage.pageCheck(browser);

    await InventoryPage.cartPage();
    await CartPage.pageCheck(browser);
    await CartPage.emptyCartCheck();
    await CartPage.checkoutPage();
    await CartPage.pageCheck(browser);
    await CartPage.emptyCartErrorMsg();
  });
});
