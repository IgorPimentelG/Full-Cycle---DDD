import EventHandlerInterface from "../../@shared/event-handler.interface";
import EventInterface from "../../@shared/event.interface";

export default class SendConsoleLog3Handler implements EventHandlerInterface {
  handle(event: EventInterface) {
    console.log(`
      Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} 
      alterado para ${event.eventData.address}
    `);
  }
}