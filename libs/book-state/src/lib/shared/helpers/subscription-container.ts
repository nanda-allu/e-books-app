import { Subscription } from "rxjs";

export class SubscriptionsContainer {
  private subsciptions: Subscription[] = [];

  set add(sub: Subscription) {
    this.subsciptions.push(sub);
  }
  public unsubscribe() {
    this.subsciptions.forEach(sub => sub.unsubscribe());
  }
}
