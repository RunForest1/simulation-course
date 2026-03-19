export type ClientState =
  | "WAITING"
  | "IN_SERVICE"
  | "SERVED"
  | "LEFT_QUEUE"
  | "REJECTED";

export interface ClientData {
  id: number;
  arrivalTime: number;
  deadline: number;
  serviceStartTime?: number;
  finishTime?: number;
  state: ClientState;
}

export interface SystemStats {
  served: number;
  rejected: number;
  leftQueue: number;
  avgWait: number;
  queueLength: number;
  busyServers: number;
}
