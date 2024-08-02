import EventInterface from "../../events/@shared/event.interface";

export default abstract class Entity {

  private _events = new Set<EventInterface>();

  addEvent(event: EventInterface) {
    this._events.add(event);
  }

  clearEvents() {
    this._events.clear();
  }

  get events(): EventInterface[] {
    return Array.from(this._events);
  }
}