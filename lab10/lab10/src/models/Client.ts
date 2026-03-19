import { type ClientState } from "../types";

export class Client {
  public id: number;
  public arrivalTime: number;
  public serviceTimeRequired: number;
  public patienceTime: number;
  public deadline: number;
  public serviceStartTime?: number;
  public finishTime?: number;

  public state: ClientState = "WAITING";

  constructor(
    id: number,
    arrivalTime: number,
    mu: number,
    avgPatience: number,
  ) {
    this.id = id;
    this.arrivalTime = arrivalTime;

    // Время обслуживания ~ Exp(mu)
    this.serviceTimeRequired = -Math.log(Math.random()) / mu;

    // Время терпения ~ Exp(1/avgPatience)
    const nu = 1 / avgPatience;
    this.patienceTime = -Math.log(Math.random()) / nu;

    this.deadline = arrivalTime + this.patienceTime;
  }

  public isImpatient(currentTime: number): boolean {
    return this.state === "WAITING" && currentTime >= this.deadline;
  }

  public startService(time: number) {
    this.state = "IN_SERVICE";
    this.serviceStartTime = time;
    this.finishTime = time + this.serviceTimeRequired;
  }

  public finish(time: number) {
    this.state = "SERVED";
    this.finishTime = time;
  }

  public leaveQueue() {
    this.state = "LEFT_QUEUE";
  }

  public reject() {
    this.state = "REJECTED";
  }
}
