export class TaskItems {
  id: number;
  name: string;
  description: string;
  creationDate: Date;
  status: boolean;
  endDate: Date;

  constructor(id: number, name: string, description: string, creationDate: Date, status: boolean, endDate: Date) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.creationDate = creationDate;
    this.status = status;
    this.endDate = endDate;
  }
}

export class Model {
  items: TaskItems[] = [];
} 
