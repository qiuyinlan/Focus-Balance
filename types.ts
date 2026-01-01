
export interface FocusSession {
  startTime: number;
  totalSeconds: number;
  totalMoney: number;
  isActive: boolean;
}

export interface Coin {
  id: number;
  x: number;
  y: number;
  xMid: number;
  yMid: number;
}
