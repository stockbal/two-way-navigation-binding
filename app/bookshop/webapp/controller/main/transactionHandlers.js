/**
 * @typedef {import('sap/ui/model/odata/v2/ODataModel').default} ODataModel
 * @typedef {import('../MainView.controller').default} MainController
 */

export default {
  /**
   * @this MainController
   */
  onRefresh() {
    this.getView()?.getModel()?.resetChanges();
    this.getView()?.getModel()?.refresh(true, true);
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
