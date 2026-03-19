import { Client } from "./Client";
import { type SystemStats } from "../types";

export class MMnSystem {
  private servers: (Client | null)[];
  private queue: Client[];
  private maxQueueSize: number;

  // 1. Объявляем свойство отдельно
  public n: number;

  // Статистика
  public servedCount = 0;
  public rejectedCount = 0;
  public leftQueueCount = 0;
  public totalWaitTime = 0;
  public servedClientsCountForAvg = 0;

  constructor(n: number, maxQueueSize: number) {
    // 2. Присваиваем значение вручную
    this.n = n;

    this.servers = Array(n).fill(null);
    this.queue = [];
    this.maxQueueSize = maxQueueSize;
  }

  public resizeServers(n: number) {
    if (n === this.n) return; 

    if (n > this.n) {
      this.servers.push(...Array(n - this.n).fill(null));
    } else {
      for (let i = this.servers.length - 1; i >= n; i--) {
        const client = this.servers[i];
        if (client) {
          client.serviceStartTime = undefined;
          client.finishTime = undefined;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          client.state = "WAITING" as any;
          this.queue.unshift(client);
        }
      }
      this.servers = this.servers.slice(0, n);
    }
    this.n = n; // Обновляем свойство
  }

  public setMaxQueue(size: number) {
    if (size < this.queue.length) {
      const removed = this.queue.splice(size);
      removed.forEach((c) => {
        c.leaveQueue();
        this.leftQueueCount++;
      });
    }
    this.maxQueueSize = size;
  }

  public arrive(client: Client): boolean {
    const freeIndex = this.servers.findIndex((s) => s === null);
    if (freeIndex !== -1) {
      this.servers[freeIndex] = client;
      client.startService(client.arrivalTime);
      return true;
    }

    if (this.queue.length < this.maxQueueSize) {
      this.queue.push(client);
      return true;
    }

    client.reject();
    this.rejectedCount++;
    return false;
  }

  public step(currentTime: number) {
    const remainingQueue: Client[] = [];
    for (const client of this.queue) {
      if (client.isImpatient(currentTime)) {
        client.leaveQueue();
        this.leftQueueCount++;
      } else {
        remainingQueue.push(client);
      }
    }
    this.queue = remainingQueue;

    for (let i = 0; i < this.servers.length; i++) {
      const client = this.servers[i];
      if (
        client &&
        client.finishTime !== undefined &&
        currentTime >= client.finishTime
      ) {
        client.finish(currentTime);
        this.servers[i] = null;
        this.servedCount++;

        const waitTime = (client.serviceStartTime || 0) - client.arrivalTime;
        this.totalWaitTime += Math.max(0, waitTime);
        this.servedClientsCountForAvg++;

        if (this.queue.length > 0) {
          const nextClient = this.queue.shift()!;
          this.servers[i] = nextClient;
          nextClient.startService(currentTime);
        }
      }
    }
  }

  public getStats(): SystemStats {
    return {
      served: this.servedCount,
      rejected: this.rejectedCount,
      leftQueue: this.leftQueueCount,
      avgWait:
        this.servedClientsCountForAvg > 0
          ? this.totalWaitTime / this.servedClientsCountForAvg
          : 0,
      queueLength: this.queue.length,
      busyServers: this.servers.filter((s) => s !== null).length,
    };
  }

  public getQueue() {
    return [...this.queue];
  }
  public getServers() {
    return [...this.servers];
  }
}
