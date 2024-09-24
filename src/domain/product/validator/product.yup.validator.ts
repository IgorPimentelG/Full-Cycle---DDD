import ValidatorInterface from "../../@shared/validator/validator.interface";
import Product from "../entities/Product";
import * as yup from "yup";

export class ProductYupValidator implements ValidatorInterface<Product> {

  validate(entity: Product): void {
    try {
      yup.object()
        .shape({
          name: yup.string().required("Name is required"),
          id: yup.string().required("ID is required"),
          price: yup.number()
            .notOneOf([0], "Price is required")
            .moreThan(0, "Price must be greater than zero"),
          })
        .validateSync({
          id: entity.id,
          name: entity.name,
          price: entity.price,
        }, {
          abortEarly: false,
        });
    } catch (errors) {
      const e = errors as yup.ValidationError;
      e.errors.forEach((error) => {
        entity._notification.addError({
          context: "product",
          message: error,
        });
      });
    }
  }
}