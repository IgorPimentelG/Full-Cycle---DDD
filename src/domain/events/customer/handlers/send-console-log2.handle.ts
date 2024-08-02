import EventHandlerInterface from '../../@shared/event-handler.interface';
import EventInterface from '../../@shared/event.interface';

export default class SendConsoleLog2Handler implements EventHandlerInterface {
  handle(event: EventInterface): void {
    console.log(`Essa é o segundo console.log do evento: ${event.constructor.name}`);
  }
}