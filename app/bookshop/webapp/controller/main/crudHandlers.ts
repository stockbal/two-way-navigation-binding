import MessageBox from "sap/m/MessageBox";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import MainViewController from "../MainView.controller";
import Context from "sap/ui/model/odata/v2/Context";

export default {
  onAdd(this: MainViewController) {
    (this.getView()?.getModel() as ODataModel).create(
      "sales",
      {},
      {
        context: this.getView()?.getBindingContext() as Context,
        success: () => {
          console.log(this.salesTable.getItems());
        },
      },
    );
  },
  onDelete(this: MainViewController) {
    const selectedContexts = this.salesTable.getSelectedContexts();
    if (!selectedContexts?.length) {
      MessageBox.error("No rows selected");
      return;
    }
    const model = this.getView()?.getModel() as ODataModel;
    selectedContexts?.forEach((c) => {
      model.remove(c.getPath());
    });
  },
};
