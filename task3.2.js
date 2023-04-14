// Читаем данные из файла input.json
import { readFileSync, writeFileSync } from 'fs';
const inputData = JSON.parse(readFileSync('input.json'));

// Проверяем, достаточно ли футболок каждого размера
const available = inputData.available;
const requested = inputData.requested;
for (const size in requested) {
  if (requested.hasOwnProperty(size)) {
    const count = requested[size];
    if (size.length === 1) {
      if (available[size] < count) {
        console.log(`Не достаточно футболок размера ${size}`);
        process.exit();
      }
    } else {
      const size1 = size[0];
      const size2 = size[1];
      if (available[size1] + available[size2] < count) {
        console.log(`Не достаточно футболок размера ${size}`);
        process.exit();
      }
    }
  }
}

// Определяем, какой размер футболки подойдет для каждого участника
const result = {};
for (const name in inputData.participants) {
  if (inputData.participants.hasOwnProperty(name)) {
    const sizes = inputData.participants[name];
    if (sizes.length === 1) {
      const size = sizes[0];
      if (available[size] > 0) {
        result[name] = size;
        available[size]--;
      } else {
        console.log(`Не удалось подобрать футболку для ${name}`);
        process.exit();
      }
    } else {
      const size1 = sizes[0];
      const size2 = sizes[1];
      if (available[size1] > 0) {
        result[name] = size1;
        available[size1]--;
      } else if (available[size2] > 0) {
        result[name] = size2;
        available[size2]--;
      } else {
        console.log(`Не удалось подобрать футболку для ${name}`);
        process.exit();
      }
    }
  }
}

writeFileSync('output.json', JSON.stringify(result));


/* 
{
  "tshirts": {
    "S": 10,
    "M": 20,
    "L": 15,
    "XL": 7,
    "XXL": 4,
    "XXXL": 2
  },
  "participants": [
    {
      "name": "John",
      "sizes": ["M"]
    },
    {
      "name": "Alex",
      "sizes": ["S", "M"]
    },
    {
      "name": "Sarah",
      "sizes": ["XL"]
    },
    {
      "name": "Emma",
      "sizes": ["L", "XL"]
    },
    {
      "name": "Peter",
      "sizes": ["XXL"]
    },
    {
      "name": "Mike",
      "sizes": ["XXXL"]
    }
  ]
}



{
  "success": true,
  "result": {
    "John": "M",
    "Alex": "S",
    "Sarah": "XL",
    "Emma": "L",
    "Peter": "XXL",
    "Mike": "XXXL"
  }
}

*/