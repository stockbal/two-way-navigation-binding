sap.ui.define(
  ["sap/m/Input", "sap/m/InputRenderer"],
  (InputBase, InputBaseRenderer) => {
    const CustomInput = InputBase.extend("shop.bookshop.controls.CustomInput", {
      metadata: {},
      renderer: InputBaseRenderer,
    });

    CustomInput.prototype.init = function () {
      InputBase.prototype.init.call(this);
    };

    CustomInput.prototype.applySettings = function () {
      console.log("Settings for custom control:", JSON.stringify(arguments));
      InputBase.prototype.applySettings.apply(this, arguments);

      //   console.log(this.getBinding("value").getValue());
    };

    CustomInput.prototype.onAfterRendering = function () {
      InputBase.prototype.onAfterRendering.call(this);

      console.log("Value", this.getValue());
    };

    return CustomInput;
  }
);
