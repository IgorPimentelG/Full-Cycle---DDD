import EventInterface from "../@shared/event.interface";

type EventData = {
  id: string;
  name: string;
  address: {
    street: string;
    number: number;
    zipcode: string;
    city: string;
    country: string;
  };
}

export default class CustomerChangeAddressEvent implements EventInterface {
  dataTimeOccured: Date;
  eventData: EventData;

  constructor(eventData: EventData) {
    this.dataTimeOccured = new Date();
    this.eventData = eventData;
  }
}