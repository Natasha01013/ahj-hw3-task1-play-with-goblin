import goblinImage from '../images/goblin.png'; 

export class Goblin {
    constructor(cell, game) {
      this.cell = cell; // Ячейка, где будет гоблин
      this.game = game; // Ссылка на объект игры
      this.img = document.createElement('img');
      this.img.src = goblinImage; // Путь к картинке гоблина
      this.img.alt = 'Гоблин';
      this.img.width = 90;
      this.img.height = 90;
    }
  
    // Метод для показа гоблина 
    show() {
      this.cell.appendChild(this.img); //Добавляем гоблина в ячейку
      this.img.addEventListener('click', this.hit.bind(this)); // Привязываем hit() к этому объекту
      setTimeout(() => this.hide(), 1000); // Скрыть гоблина через 1 секунду
    }

    // Метод для скрытия гоблина 
    hide() { 
      this.img.remove();
    }
  
    //Когда игрок кликает на гоблина, вызывается метод hit(), который сразу скрывает гоблина через метод hide()
    hit() {
        console.log("Гоблин был убит!");
        this.hide();
        this.game.incrementScore(); // Увеличиваем пойманных гоблинов
       
        if (this.onCatch) { // Если функция onCatch была установлена, вызываем её
          this.onCatch(); // Устанавливаем флаг, что гоблин был пойман
        }
    }
}