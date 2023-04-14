import { readFileSync, writeFileSync } from "fs";
const data = JSON.parse(readFileSync("input.json"));

const n = data.n; // количество строк
const m = data.m; // количество столбцов
const plan = data.plan; // массив с планом расположения актеров

// Функция для проверки, есть ли актер в направлении света прожектора
function checkDirection(x, y, direction, plan) {
  if (direction === "left") {
    for (let j = y - 1; j >= 0; j--) {
      if (plan[x][j] === 1) {
        return true;
      }
    }
  } else if (direction === "up") {
    for (let i = x - 1; i >= 0; i--) {
      if (plan[i][y] === 1) {
        return true;
      }
    }
  } else if (direction === "right") {
    for (let j = y + 1; j < m; j++) {
      if (plan[x][j] === 1) {
        return true;
      }
    }
  } else if (direction === "down") {
    for (let i = x + 1; i < n; i++) {
      if (plan[i][y] === 1) {
        return true;
      }
    }
  }
  return false;
}

// Подсчет количества хороших позиций для установки прожектора
let count = 0;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (plan[i][j] === 0) {
      // Проверяем, нет ли актера на данной клетке
      if (
        checkDirection(i, j, "left", plan) ||
        checkDirection(i, j, "up", plan) ||
        checkDirection(i, j, "right", plan) ||
        checkDirection(i, j, "down", plan)
      ) {
        count++;
      }
    }
  }
}

// Записываем результат в файл output.json
const outputData = {
  count: count,
};
writeFileSync("output.json", JSON.stringify(outputData));
