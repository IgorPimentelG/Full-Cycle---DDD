import EventInterface from "../event/event.interface";
import { Notification } from "../notification/notification";

export default abstract class Entity {

  protected _id: string;
  protected _notification: Notification;
  protected _events = new Set<EventInterface>();

  constructor() {
    this._id = "";
    this._notification = new Notification();
  }

  addEvent(event: EventInterface) {
    this._events.add(event);
  }

  clearEvents() {
    this._events.clear();
  }

  get events(): EventInterface[] {
    return Array.from(this._events);
  }

  get id(): string {
    return this._id;
  }
}