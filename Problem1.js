const alphabet = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя'.split('');

function isSameCh(firstString, secondString, ch1, ch2) {
  for (let i = 0; i < firstString.length; i++) {
    if (firstString[i] === ch1) {
      if (secondString[i] !== ch2) {
        return false;
      }
    }
  }
  return true;
}


function canTransform(firstString, secondString) {
  if (firstString.length !== secondString.length) {
    return 0;
  }

  if (firstString === secondString) {
    return 1;
  }

  const transformations = new Map();
  const targetMap = new Map();

  for (let i = 0; i < firstString.length; i++) {
    targetMap.set(secondString[i], 1);
    
    if (!transformations.has(firstString[i])) {
      transformations.set(firstString[i], secondString[i]);
    } else {
      if (transformations.get(firstString[i]) !== secondString[i]) {
        return 0;
      }
    }
  }

  return targetMap.size < 33 ? 1 : 0;
}


function canTransform(firstString, secondString) {
  if (firstString.length !== secondString.length) {
    return 0;
  }

  const transformations = new Map();
  let availableReplacemenets = alphabet.filter(ch => {
    return !secondString.includes(ch);
  });

  if (!availableReplacemenets.length) {
    return 0;
  }

  for (let i = 0; i < firstString.length; i++) {
    const firstCh = firstString[i];
    const secondCh = secondString[i];

    if (firstCh !== secondCh) {      
      if (transformations.has(firstCh)) {
        return 0;
      } else {
        if (firstString.substring(i, firstString.length).includes(secondCh)) {
          if (!isSameCh(firstString, secondString, firstCh, secondCh)) {
            return 0;
          }

          const last = availableReplacemenets.pop();
          firstString = firstString.replace(new RegExp(`${secondCh}`, 'g'), last);
          transformations.set(secondCh, last);
          i -= 1;
        } else {
          transformations.set(firstCh, secondString[i]);
          firstString = firstString.replace(new RegExp(`${firstCh}`, 'g'), secondString[i])
        }
      }
    }

    if (firstString === secondString) {
      return 1;
    }
  }
  return 0;
}

const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);
rl.on('line', (line) => {
    // Введенная строка в переменной line, тут можно написать решение
    const [ firstString, secondString ] = line.split(' ');
    console.log(canTransform(firstString, secondString));
    rl.close();
    return;
}).on('close', () => process.exit(0));
