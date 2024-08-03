import { CustomerCreatedEvent } from './../customer-created.event';
import EventHandlerInterface from '../../@shared/event-handler.interface';
import EventInterface from '../../@shared/event.interface';

export default class SendConsoleLog1Handler implements EventHandlerInterface<CustomerCreatedEvent> {
  handle(event: EventInterface): void {
    console.log(`Esse é o primeiro console.log do evento: ${event.constructor.name}`);
  }
}