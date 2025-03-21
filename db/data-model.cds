using {
    cuid,
    managed,
    Currency
} from '@sap/cds/common';
using from '@sap/cds-common-content';

namespace shop;

entity Books : cuid, managed {
    title : String;
    sales : Composition of many Sales
                on sales.book = $self;
}

entity Sales : cuid, managed {
    amount       : Decimal;
    currency     : Currency;
    book         : Association to Books;
    salesPersons : Composition of many InvolvedSalesPersons
                       on salesPersons.sale = $self;
}

entity InvolvedSalesPersons : cuid, managed {
    name : String;
    sale : Association to Sales;
}
