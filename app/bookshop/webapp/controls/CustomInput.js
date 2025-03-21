import Input from "sap/m/Input";
import InputRenderer from "sap/m/InputRenderer";

/**
 * Simple custom control to extend default sap.m.Input control
 * @namespace shop.bookshop.controls
 */
export default class CustomInput extends Input {
  metadata = {};
  renderer = InputRenderer;

  init() {
    super.init();
  }

  applySettings() {
    console.log("Settings for custom control:", JSON.stringify(arguments));
    super.applySettings.apply(this, arguments);
  }

  onAfterRendering() {
    super.onAfterRendering();
    console.log("Value", this.getValue());
  }
}
