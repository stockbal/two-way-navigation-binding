import UIComponent from "sap/ui/core/UIComponent";
import models from "./model/models";

/**
 * @namespace shop.bookshop
 */
export default class BookshopComponent extends UIComponent {
  static metadata = { manifest: "json", interfaces: ["sap.ui.core.IAsyncContentCreation"] };

  init() {
    super.init(arguments);

    // set the device model
    this.setModel(models.createDeviceModel(), "device");

    // enable routing
    this.getRouter().initialize();
  }
}
