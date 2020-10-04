const assert = require('assert').strict;

function solve(arr) {
  const events = [];

  for (let i = 0; i < arr.length; i++) {
    events.push({ open: true, timestamp: arr[i].begin });
    events.push({ open: false, timestamp: arr[i].end });
  }

  events.sort((firstEl, secondEl) => {
    if (firstEl.timestamp < secondEl.timestamp) {
      return -1;
    }

    if (firstEl.timestamp > secondEl.timestamp) {
      return 1;
    }

    if (firstEl.open && !secondEl.open) {
      return -1;
    }

    if (!firstEl.open && secondEl.open) {
      return 1;
    }

    return 0;
  })

  let maxOpenedJobs = 0;

  for (let i = 0, openedJobs = 0; i < events.length; i++) {
    openedJobs += events[i].open ? 1 : -1;

    if (maxOpenedJobs < openedJobs) {
      maxOpenedJobs = openedJobs;
    }
  }

  const intervals = [];

  for (let i = 0, openedJobs = 0; i < events.length; i++) {
    openedJobs += events[i].open ? 1 : -1;

    if (openedJobs === maxOpenedJobs) {
      intervals.push({ begin: events[i].timestamp, end: events[i + 1].timestamp });
    }
  }

  return intervals;
}

function test() {
  assert.deepStrictEqual(solve([
    { begin: 1595862781, end: 1595862782 },
    { begin: 1595862783, end: 1595862784 },
  ]), [    
    { begin: 1595862781, end: 1595862782 },
    { begin: 1595862783, end: 1595862784 },
  ]);

  assert.deepStrictEqual(solve([
    { begin: 1595862781, end: 1595862783 },
    { begin: 1595862782, end: 1595862784 },
  ]), [
    { begin: 1595862782, end: 1595862783 }
  ])
}

test();

const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);
let inputSize = null;
const input = [];
rl.on('line', (line) => {
    // Введенная строка в переменной line, тут можно написать решение
    if (!inputSize) {
      inputSize = Number(line);
    } else {
      const [ begin, end ] = line.split(' ').map(el => Number(el));
      input.push({ begin, end });
    }

    if (input.length === inputSize) {
      const output = solve(input);
      console.log(output.length, output.reduce((sum, el) => sum + el.end + 1 - el.begin, 0));
      rl.close();
    }
}).on('close', () => process.exit(0));
