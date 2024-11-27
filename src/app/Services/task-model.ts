export class TaskItems {
  id: number;
  name: string;
  description: string;
  creationDate: Date;
  status: boolean;
  endDate: Date; // Bitiş tarihi ekleniyor

  constructor(id: number, name: string, description: string, creationDate: Date, status: boolean, endDate: Date) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.creationDate = creationDate;
    this.status = status;
    this.endDate = endDate; // endDate parametresi de ekleniyor
  }
}

export class Model {
  items: TaskItems[] = []; // TaskItems dizisi
}