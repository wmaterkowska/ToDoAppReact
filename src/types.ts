export class Todo {
  title?: string;
  content: string;
  done: boolean;
  lastChange: number;

  constructor(content: string, title?: string) {
    this.title = title;
    this.content = content;
    this.done = false;
    this.lastChange = Date.now();
  }

}