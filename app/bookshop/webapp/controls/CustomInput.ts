import Input from "sap/m/Input";
import InputRenderer from "sap/m/InputRenderer";
import Event from "sap/ui/base/Event";
import { $ManagedObjectSettings } from "sap/ui/base/ManagedObject";

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

  applySettings(mSettings: $ManagedObjectSettings, oScope?: object) {
    console.log("Settings for custom control:", JSON.stringify(arguments));
    super.applySettings(mSettings, oScope);
    return this;
  }

  onAfterRendering(oEvent: Event) {
    super.onAfterRendering(oEvent);
    console.log("Value", this.getValue());
  }
}
