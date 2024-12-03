class Observer {
  constructor(name) {
    this.name = name;
  }

  update(data) {
    console.log(`${this.name} recebeu atualização:`, data);
  }
}

export default Observer;
