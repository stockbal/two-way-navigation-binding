import Token from "sap/m/Token";
import MainViewController from "../MainView.controller";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import { Button$ClickEvent } from "sap/ui/webc/main/Button";
import ColumnListItem from "sap/m/ColumnListItem";
import MultiInput from "sap/m/MultiInput";
import Context from "sap/ui/model/odata/v2/Context";

export default {
  onNewToken(this: MainViewController, event: Button$ClickEvent) {
    const model = this.getView()?.getModel() as ODataModel;
    const row = event.getSource().getParent() as ColumnListItem;
    const multiInput = row.getCells()[1] as MultiInput;

    const context = this.getView()?.getBindingContext() as Context;
    const newContext = model.createEntry(
      `${context.getPath()}/sales(guid'${(row.getBindingContext() as Context).getProperty("ID")}')/salesPersons`,
      { properties: { name: "New " + new Date().getMilliseconds() } },
    );

    const newToken = new Token({ key: "{ID}", text: "{name}" });
    newToken.setBindingContext(newContext!);
    multiInput.addToken(newToken);
  },
};
