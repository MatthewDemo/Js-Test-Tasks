import { readFileSync, writeFileSync } from "fs";
const weights = [0.5, 1, 2.5, 5, 10, 15, 20, 25]; // доступные веса в килограммах
const lbsWeights = [10, 25, 35, 45]; // доступные веса в lbs
const barWeight = 20; // вес штанги в кг

const input = JSON.parse(readFileSync("input.json"));
const targetWeight = input.targetWeight;

const plates = []; // массив для хранения выбранных блинов

// вспомогательная функция для вычисления веса блинов
function plateWeight(plates) {
  return plates.reduce((total, plate) => total + plate.weight * plate.count, 0);
}

// Добавляем блины в порядке убывания, пока вес не будет равен предыдущему рекорду
for (let i = 0; i < weights.length; i++) {
  for (let j = 0; j < 2; j++) {
    if (plateWeight(plates) + weights[i] * 2 + barWeight >= targetWeight) {
      break;
    }
    plates.push({ weight: weights[i], count: 1 });
  }
}

// в случае необходимости добавляем американские блины
if (plateWeight(plates) + barWeight < targetWeight) {
  for (let i = 0; i < lbsWeights.length; i++) {
    for (let j = 0; j < 2; j++) {
      const weightKg = lbsWeights[i] * 0.453592; // конвертируем фунты в килограммы
      if (plateWeight(plates) + weightKg * 2 + barWeight >= targetWeight) {
        break;
      }
      plates.push({ weight: weightKg, count: 1 });
    }
  }
}

const output = { plates };
writeFileSync("output.json", JSON.stringify(output));
