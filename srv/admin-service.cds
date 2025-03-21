using {shop} from '../db/data-model';

service AdminService {
    @Capabilities.InsertRestrictions.Insertable
    @Capabilities.UpdateRestrictions.Updatable
    @Capabilities.DeleteRestrictions.Deletable
    entity Books                as projection on shop.Books;

    entity Sales                as projection on shop.Sales;
    entity InvolvedSalesPersons as projection on shop.InvolvedSalesPersons;
}
