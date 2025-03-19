/**
 * @typedef {import('sap/ui/core/mvc/Controller').default} Controller
 * @typedef {import('sap/m/MultiInput').default} MultiInput
 * @typedef {import('sap/ui/model/odata/v2/ODataListBinding').default} ODataListBinding
 * @typedef {import('sap/ui/model/odata/v2/ODataModel').default} ODataModel
 * @typedef {import('sap/m/Table').default} Table
 * @typedef {import('sap/m/Token').default} Token
 */
sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/ColumnListItem",
    "sap/m/Input",
    "sap/m/HBox",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment",
    "sap/m/Token",
  ],
  (Controller, ColumnListItem, Input, HBox, MessageBox, Fragment, Token) => {
    "use strict";

    return Controller.extend("shop.bookshop.controller.MainView", {
      onInit() {
        this.deletedTokenPaths = [];
        this.salesTable = this.byId("idSalesTable");
        this.getView().bindObject({
          path: "/Books(guid'64959d98-af41-4bc8-853a-9a13636c598e')",
          parameters: {
            $expand: "sales",
            $select: "title,sales",
          },
        });
        this.rebindTable().then(() => {});
      },
      /**
       * @this Controller
       */
      onRefresh() {
        this.getView().getModel().resetChanges();
        this.getView().getModel().refresh(true, true);
        this.deletedTokenPaths.splice(0, this.deletedTokenPaths.length);
      },
      /**
       * @this Controller
       */
      onChanged(event) {
        console.log(event);
      },
      /**
       * @this Controller
       */
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
      /**
       * @this Controller
       */
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
      /**
       * @this Controller
       */
      onSave(event) {
        // delete all stored token paths
        this.deletedTokenPaths.forEach((p) =>
          this.getView().getModel().remove(p)
        );
        this.deletedTokenPaths.splice(0, this.deletedTokenPaths.length);
        this.getView().getModel().submitChanges();
      },
      onCancel() {
        this.getView().getModel().resetChanges();
        this.deletedTokenPaths.splice(0, this.deletedTokenPaths.length);
      },
      /**
       *
       * @param {import('sap/m/MultiInput').MultiInput$TokenUpdateEvent} event
       */
      onTokenChange(event) {
        const removedTokens = event.getParameter("removedTokens");
        removedTokens?.forEach((t) => {
          /** @type {import('sap/ui/model/odata/v2/ODataModel').default} */
          const model = this.getView().getModel();

          const input = event.getSource();

          /** @type {ODataListBinding} */
          const binding = input.getBinding("tokens");
          console.log(binding.getPath());
          console.log(binding.getMetadata());

          // model.remove(event.getSource().getBindingContext().getPath(), {
          //   success: (data) => {
          //     console.log(`Token ${data} has been removed`);
          //   },
          // });
          const context = t.getBindingContext();
          if (context?.bCreated) {
            // model.resetChanges([context.getPath()]).then(() => {});
            model.deleteCreatedEntry(context);
          } else {
            this.deletedTokenPaths.push(context.getPath());
          }
        });
      },
      /**
       * @this Controller
       */
      async rebindTable() {
        if (!this.template) {
          this.template = await Fragment.load({
            name: "shop.bookshop.fragment.SalesItem",
            controller: this,
          });
        }
        this.salesTable.bindItems({
          path: "sales",
          template: this.template,
          templateShareable: true,
        });
      },

      onNewToken(event) {
        /** @type {ODataModel} */
        const model = this.getView().getModel();
        const rowBox = event.getSource().getParent();
        /** @type {MultiInput} */
        const multiInput = rowBox.getItems()[2];

        // console.log(rowBox.getMetadata());
        const newContext = model.createEntry(
          `${this.getView().getBindingContext().getPath()}/sales(guid'${rowBox
            .getBindingContext()
            .getProperty("ID")}')/salesPersons`,
          { properties: { name: "New " + new Date().getMilliseconds() } }
        );

        // model.create(
        //   `${this.getView().getBindingContext().getPath()}/sales(guid'${rowBox
        //     .getBindingContext()
        //     .getProperty("ID")}')/salesPersons`,
        //   { name: "New " + new Date().getMilliseconds() }
        // );

        const newToken = new Token({ key: "{ID}", text: "{name}" });
        // newToken.attachDelete({}, this.onSalesPersonRemoved, this);
        newToken.setBindingContext(newContext);

        multiInput.addToken(newToken);
      },
    });
  }
);
