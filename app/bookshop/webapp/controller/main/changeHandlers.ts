import { MultiInput$TokenUpdateEvent } from "sap/m/MultiInput";
import Context from "sap/ui/model/odata/v2/Context";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import { Input$ChangeEvent } from "sap/ui/webc/main/Input";
import MainViewController from "../MainView.controller";

export default {
  onChanged(this: MainViewController, event: Input$ChangeEvent) {
    console.log(event);
  },
  onTokenChange(this: MainViewController, event: MultiInput$TokenUpdateEvent) {
    const removedTokens = event.getParameter("removedTokens");
    removedTokens?.forEach((t) => {
      const model = this.getView()?.getModel() as ODataModel;

      const context = t.getBindingContext() as Context;
      if ((context as unknown as { bCreated: boolean })?.bCreated) {
        model.deleteCreatedEntry(context);
      } else {
        this.deletedTokenPaths.push(context.getPath());
      }
    });
  },
};
