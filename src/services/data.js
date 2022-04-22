// Emulates legacy JS data API

export async function getData() {
    return [
      { id: 1, title: "Eat", createdAt: new Date(), doneAt: new Date(), isDone: true },
      { id: 2, title: "Code", createdAt: new Date(), isDone: false },
      { id: 3, title: "Sleep", createdAt: new Date(), isDone: false },
    ];
}
