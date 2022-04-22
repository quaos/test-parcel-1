export default interface TodoItem {
  id: number;
  title: string;
  createdAt: Date;
  doneAt?: Date;
  isDone: boolean;
}
