/**
 * @typedef {import('sap/m/MultiInput').default} MultiInput
 * @typedef {import('sap/ui/model/odata/v2/ODataModel').default} ODataModel
 * @typedef {import('../MainView.controller').default} MainController
 */

import Token from "sap/m/Token";

export default {
  /**
   * @this MainController
   */
  onNewToken(event) {
    /** @type {ODataModel} */
    const model = this.getView().getModel();
    const row = event.getSource().getParent();
    /** @type {MultiInput} */
    const multiInput = row.getCells()[1];

    const newContext = model.createEntry(
      `${this.getView().getBindingContext().getPath()}/sales(guid'${row
        .getBindingContext()
        .getProperty("ID")}')/salesPersons`,
      { properties: { name: "New " + new Date().getMilliseconds() } },
    );

    const newToken = new Token({ key: "{ID}", text: "{name}" });
    newToken.setBindingContext(newContext);
    multiInput.addToken(newToken);
  },
};
