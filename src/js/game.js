import {Goblin} from './goblin.js';

export class Game {
  constructor() {
    // Начальные значения игры
    this.score = 0;
    this.missedGoblins = 0;
    this.maxMissed = 5; // Максимально допустимое количество пропущенных гоблинов
    this.interval = null;

    // Инициализация игрового поля и элементов управления
    this.board = document.getElementById('game-board'); //Игровое поле
    this.scoreElement = document.getElementById('score'); //Очки
    this.missedElement = document.getElementById('missed'); //Пропущенные гоблины
    this.createBoard();
  }

  // Метод для создания игрового поля
  createBoard() {
    for (let i = 0; i < 16; i++) {
      const cell = document.createElement('div');
      this.board.appendChild(cell);
  }
}

  // Метод для запуска игры
  startGame() {
    this.interval = setInterval(() => this.spawnGoblin(), 1000); // Меняем гоблина каждую секунду
  }

  // Метод появления гоблина в случайной ячейке
  spawnGoblin() {
    const randomIndex = Math.floor(Math.random() * 16);
    const cell = this.board.children[randomIndex];

    if (cell.querySelector('img')) return; // Если в ячейке уже есть гоблин, пропускаем её
    const goblin = new Goblin(cell, this); // Передаем игру в гоблина
    goblin.show();

    let goblinCaught = false; // Флаг, показывающий, был ли гоблин пойман

    goblin.onCatch = () => {// Функция обновляет флаг, если гоблин был пойман
      goblinCaught = true; 
    };

    setTimeout(() => { // На поимку гоблина дается 1 секунда
      if (!goblinCaught && !cell.querySelector('img')) { //Если гоблин не в ячейке и не пойман, 
        this.incrementMissed(); //увеличивается счётчик пропущенных гоблинов
      }     
    }, 1000);
  }

  // Метод увеличивает счет на 1 для пойманных гоблинов
  incrementScore() {
    this.score++;
    console.log("Поймано:", this.score); 
    this.scoreElement.textContent = `Поймано гоблинов: ${this.score}`;
  }

  // Метод увеличивает счет на 1 для пропущенных гоблинов
  incrementMissed() {
    this.missedGoblins++;
    console.log("Пропущено:", this.missedGoblins); 
    this.missedElement.textContent = `Пропущено гоблинов: ${this.missedGoblins}`;
    if (this.missedGoblins === this.maxMissed) { //Если количество пропущенных гоблинов превышает или равно максимальному значению, 
      this.endGame(); // игра заканчивается
    }
  }

  // Метод завершения игры
  endGame() {
    clearInterval(this.interval);
    alert(`Игра завершена! Ваш счёт: ${this.score}`);
  }
}


