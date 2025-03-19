sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/ColumnListItem",
    "sap/m/Input",
    "sap/m/HBox",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment",
  ],
  (Controller, ColumnListItem, Input, HBox, MessageBox, Fragment) => {
    "use strict";

    return Controller.extend("shop.bookshop.controller.MainView", {
      onInit() {
        this.salesTable = this.byId("idSalesTable");

        this.editableTemplate = new ColumnListItem({
          cells: [
            new HBox({
              items: [
                new Input({
                  value: "{amount}",
                }),
                new Input({
                  value: "{currency_code}",
                }),
              ],
            }),
          ],
        });

        this.getView().bindObject({
          path: "/Books(guid'64959d98-af41-4bc8-853a-9a13636c598e')",
          parameters: {
            $expand: "sales",
            $select: "title,sales",
          },
        });
        this.rebindTable().then(() => {});
      },
      onRefresh() {
        // this.rebindTable().then(() => {});
        // debugger;
        this.getView().getModel().resetChanges();
        this.getView().getModel().refresh(true, true);
      },
      salesItems(itemId, bindingContext) {
        const newItem = sap.ui.xmlfragment(
          itemId,
          "shop.bookshop.fragment.SalesItem",
          this
        );
        newItem.setBindingContext(bindingContext);
        return newItem;
      },
      onChanged(event) {
        console.log(event);
      },
      onAdd(event) {
        this.getView()
          .getModel()
          .create(
            "sales",
            {},
            {
              context: this.getView().getBindingContext(),
              success: () => {
                console.log(this.salesTable.getItems());
              },
            }
          );
      },
      onDelete(event) {
        const selectedContexts = this.salesTable.getSelectedContexts();
        if (!selectedContexts?.length) {
          MessageBox.error("No rows selected");
          return;
        }
        const model = this.getView().getModel();
        selectedContexts?.forEach((c) => {
          model.remove(c.getPath());
        });
      },
      onSave(event) {
        this.getView().getModel().submitChanges();
      },
      async rebindTable() {
        if (!this.template) {
          this.template = await Fragment.load({
            name: "shop.bookshop.fragment.SalesItem",
            controller: this,
          });
        }
        // const template = sap.ui.xmlfragment("myFrag", "shop.bookshop.fragment.SalesItem", this);
        this.salesTable.bindItems({
          path: "sales",
          template: this.template,
          templateShareable: true,
        });
      },
    });
  }
);
