export interface DetailErrorItem {
  type: string;
  messages: string[];
}

export interface DetailErrorData {
  message: string;
  details?: DetailErrorItem[];
}
