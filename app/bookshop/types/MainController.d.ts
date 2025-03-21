declare module "shop/bookshop/controller/MainView.controller" {
  import Table from "sap/m/Table";
  import Controller from "sap/ui/core/mvc/Controller";
  /**
   * Main Controller of the application
   * Note: Every method that needs to be accessed in any of the submodules of the class
   *       should be added here.
   *
   * WARNING: there is no sanity check agains the actual existing parameters, so they need to be kept
   *          in sync with webapp/controller/MainView.controller.js and its sub modules in main/
   */
  export default class MainController extends Controller {
    deletedTokenPaths: string[];
    salesTable: Table;
    rebindTable(): Promise<void>;
    onRefresh(): void;
    onSave(): void;
    onCancel(): void;
    onCustomSave(): void;
    onChanged(): void;
    onTokenChange(): void;
    onAdd(): void;
    onDelete(): void;
  }
}
