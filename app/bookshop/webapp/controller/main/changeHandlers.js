/**
 * @typedef {import('sap/ui/model/odata/v2/ODataModel').default} ODataModel
 * @typedef {import('../MainView.controller').default} MainController
 */
export default {
  /**
   * @this MainController
   */
  onChanged(event) {
    console.log(event);
  },
  /**
   *
   * @param {import('sap/m/MultiInput').MultiInput$TokenUpdateEvent} event
   * @this MainController
   */
  onTokenChange(event) {
    const removedTokens = event.getParameter("removedTokens");
    removedTokens?.forEach((t) => {
      /** @type {ODataModel} */
      const model = this.getView().getModel();

      const context = t.getBindingContext();
      if (context?.bCreated) {
        model.deleteCreatedEntry(context);
      } else {
        this.deletedTokenPaths.push(context.getPath());
      }
    });
  },
};
