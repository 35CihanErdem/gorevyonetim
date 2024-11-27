export interface Task {
    id: number;
    name: string;
    description: string;
    creationDate: Date;
    completed: boolean;
    endDate?: Date
  }
  