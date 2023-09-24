import Page from "./page.js";

class LoginPage extends Page {
  get usernameInput() {
    return $("#user-name");
  }
  get passwordInput() {
    return $("#password");
  }
  get errorLoginInputs() {
    return $$(".input_error.form_input.error");
  }
  get loginInputs() {
    return $$(".input_error.form_input");
  }
  get loginBtn() {
    return $("#login-button");
  }
  get xIcons() {
    return $$(".error_icon");
  }
  get errorMsg() {
    return $(".error-message-container");
  }

  async pageCheck(browser) {
    await expect(browser).toHaveUrl("https://www.saucedemo.com/");
  }

  async login(username, password) {
    await this.usernameInput.setValue(username);
    await this.passwordInput.setValue(password);
    await expect(this.passwordInput).toHaveAttribute("type", "password");
    await expect(this.loginBtn).toHaveAttribute("value", "Login");
    await this.loginBtn.click();
  }

  async xIconsDisplay() {
    await expect(this.xIcons).toBeDisplayed();
  }

  async redHighlight() {
    const errorLoginInputs = await this.errorLoginInputs;
    for (const input of errorLoginInputs) {
      const highlightColor = await input.getCSSProperty("border-bottom-color");
      if (highlightColor.parsed.hex !== "#e2231a") {
        throw new Error(
          `Expected red color, but found ${highlightColor.parsed.hex}`
        );
      }
    }
  }

  async errorMsgDisplay(msg) {
    await expect(this.errorMsg).toBeExisting();
    await expect(this.errorMsg).toHaveText(msg);
  }

  async afterLogout() {
    const loginInputs = await this.loginInputs;
    for (const input of loginInputs) {
      const inputValue = await input.getValue();
      if (inputValue !== "") {
        throw new Error(
          `Expected input field to be empty, but found value: ${inputValue}`
        );
      }
    }
  }

  async loginButton() {
    await this.loginBtn.click();
  } 

  open() {
    return super.open("");
  }
}

export default new LoginPage();
