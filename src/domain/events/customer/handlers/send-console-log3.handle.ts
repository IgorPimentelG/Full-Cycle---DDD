import EventHandlerInterface from "../../@shared/event-handler.interface";
import EventInterface from "../../@shared/event.interface";
import CustomerChangeAddressEvent from "../customer-change-address.event";

export default class SendConsoleLog3Handler implements EventHandlerInterface<CustomerChangeAddressEvent> {
  handle(event: EventInterface) {
    console.log(`
      Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} 
      alterado para ${event.eventData.address}
    `);
  }
}