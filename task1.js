import { readFileSync, writeFileSync } from "fs";

// считываем входные данные из файла input.json
const data = JSON.parse(readFileSync("input.json"));

const start = data.start; // начальное число
const target = data.target; // целевое число

const queue = [{ number: start, steps: 0 }]; // очередь для BFS
const visited = new Set(); // множество для отслеживания посещенных чисел

while (queue.length > 0) {
  const { number, steps } = queue.shift(); // извлекаем следующее число из очереди

  if (number === target) {
    // если достигли целевого числа, записываем количество шагов в ответ и выходим из цикла
    const output = { steps };
    writeFileSync("output.json", JSON.stringify(output));
    break;
  }

  // генерируем следующие числа, добавляем их в очередь и помечаем как посещенные
  const double = number * 2;
  const append = Number(`${number}1`);
  if (!visited.has(double) && double <= target) {
    queue.push({ number: double, steps: steps + 1 });
    visited.add(double);
  }
  if (!visited.has(append) && append <= target) {
    queue.push({ number: append, steps: steps + 1 });
    visited.add(append);
  }
}

/*
{
    "start": 10,
    "target": 101
  }



  {
    "steps": 2
  }


  */
