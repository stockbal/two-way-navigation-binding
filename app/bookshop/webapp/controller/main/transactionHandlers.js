/**
 * @typedef {import('shop/bookshop/controller/MainView.controller').default} MainController
 * @typedef {import('sap/ui/model/odata/v2/ODataModel').default} ODataModel
 */

sap.ui.define([], () => {
  return {
    /**
     * @this MainController
     */
    onRefresh() {
      this.getView().getModel().resetChanges();
      this.getView().getModel().refresh(true, true);
      this.deletedTokenPaths.splice(0, this.deletedTokenPaths.length);
    },
    /**
     * @this MainController
     */
    onSave() {
      // delete all stored token paths
      this.deletedTokenPaths.forEach((p) => this.getView().getModel().remove(p));
      this.deletedTokenPaths.splice(0, this.deletedTokenPaths.length);
      this.getView().getModel().submitChanges();
    },
    /**
     * @this MainController
     */
    onCancel() {
      this.getView().getModel().resetChanges();
      this.deletedTokenPaths.splice(0, this.deletedTokenPaths.length);
    },
    /**
     * @this MainController
     */
    onCustomSave() {
      /** @type {ODataModel} */
      const model = this.getView().getModel();
      model.setDeferredGroups(["other"]);

      model.update(this.getView().getBindingContext().getPath(), { title: "other" });

      model.submitChanges({ groupId: "other" });
    },
  };
});
