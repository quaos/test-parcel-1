import MessageEvent from "~src/models/message-event";

// Emulates Subscription/Event API

export type SubscribeCallback = (msg: MessageEvent) => void;

export default class MessagesService {
  subscribers: SubscribeCallback[] = [];

  constructor() {}

  subscribe(callback: SubscribeCallback) {
    const subsID = this.subscribers.length + 1;
    this.subscribers.push(callback);
    console.log(`MessagesService: Subscribed #${subsID}:`, callback);

    this.broadcast({ message: `Hello new subscriber#${subsID} from ${process.env.NODE_ENV}` });

    return subsID;
  }

  unsubscribe(id: number) {
    this.subscribers.splice(id - 1, 1);
    console.log(`MessagesService: Unsubscribed #${id}`);
  }

  private broadcast(evt: MessageEvent) {
    this.subscribers.forEach((sub) => sub(evt));
  }
}
