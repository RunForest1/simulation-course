export interface Client {
  id: number;
  arrivalTime: number;
  serviceStartTime?: number;
}

export interface SimulationStats {
  served: number;
  lost: number;
  avgWait: number;
}
