import { HistoryItem } from "./HistoryItem";

export interface GameState {
  history: HistoryItem[];
  target: string;
  finished: boolean;
}
