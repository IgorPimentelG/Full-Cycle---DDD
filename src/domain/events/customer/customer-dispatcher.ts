import EventDispatcher from "../event-dispatcher";
import SendConsoleLog1Handler from "./handlers/send-console-log1.handle";
import SendConsoleLog2Handler from "./handlers/send-console-log2.handle";
import SendConsoleLog3Handler from "./handlers/send-console-log3.handle";

export default class CustomerDispatcher extends EventDispatcher {

  constructor() {
    super();
    this.registerEvents();
  }

  private registerEvents() {
    this.register("CustomerCreatedEvent", new SendConsoleLog1Handler());
    this.register("CustomerCreatedEvent", new SendConsoleLog2Handler());
    this.register("CustomerChangeAddressEvent", new SendConsoleLog3Handler());
  }
}