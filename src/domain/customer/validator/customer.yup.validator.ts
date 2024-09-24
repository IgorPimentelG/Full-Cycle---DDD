import ValidatorInterface from "../../@shared/validator/validator.interface";
import Customer from "../entities/Customer";
import * as yup from "yup";

export class CustomerYupValidator implements ValidatorInterface<Customer> {
  validate(entity: Customer): void {
      try {
        yup.object()
          .shape({
            name: yup.string().required("Name is required"),
            id: yup.string().required("ID is required"),
          })
          .validateSync({
            id: entity.id,
            name: entity.name,
          }, { 
            abortEarly: false,
          });
      } catch (errors) {
          const e = errors as yup.ValidationError;
          e.errors.forEach((error) => {
            entity._notification.addError({
              context: "customer",
              message: error,
            });
          });
      }
  }
}