import EventDispatcherInterface from './@shared/event-dispatcher.interface';
import EventHandlerInterface from './@shared/event-handler.interface';
import EventInterface from './@shared/event.interface';

export default class EventDispatcher implements EventDispatcherInterface {

  private eventHandlers: {
    [eventName: string]: EventHandlerInterface[]
  } = {};

  notify(event: EventInterface): void {

    const eventName = event.constructor.name;

    if (this.eventHandlers[eventName]) {

      this.eventHandlers[eventName].forEach((handler) => {
        handler.handle(event);
      });
    }
  }

  register(eventName: string, eventHandler: EventHandlerInterface): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }

    this.eventHandlers[eventName].push(eventHandler);
  }

  unregister(eventName: string, eventHandler: EventHandlerInterface): void {
    if (this.eventHandlers[eventName]) {
      const index = this.eventHandlers[eventName].indexOf(eventHandler);

      if (index !== -1) {
        this.eventHandlers[eventName].splice(index, 1);
      }
    }
  }

  unregisterAll(): void {
    this.eventHandlers = {};
  }

  get getEventHandlers(): { [eventName: string]: EventHandlerInterface[] } {
    return this.eventHandlers;
  }
}