import { readFileSync, writeFileSync } from 'fs';

// считываем входные данные из файла input.json
const data = JSON.parse(readFileSync('input.json'));

const arr = data.arr;

let slow = arr[0];
let fast = arr[arr[0]];

// движемся по списку, пока быстрый и медленный указатели не встретятся
while (slow !== fast) {
  slow = arr[slow];
  fast = arr[arr[fast]];
}

// перемещаем медленный указатель в начало списка
slow = 0;

// двигаем оба указателя по одному шагу за итерацию, пока они не встретятся
while (slow !== fast) {
  slow = arr[slow];
  fast = arr[fast];
}

// записываем повторяющийся элемент в выходной файл output.json
const output = {duplicate: slow};
writeFileSync('output.json', JSON.stringify(output));


/* 
{
  "arr": [1, 2, 3, 4, 5, 3]
}
{
  "duplicate": 3
}
Здесь duplicate - повторяющийся элемент в массиве arr.

*/