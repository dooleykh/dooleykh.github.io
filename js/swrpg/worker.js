onmessage = (e) => {
  let rollResults = {};
  let rollAggregate = emptyDie();
  let res;

  for (let i = 1; i <= e.data.trials; i++) {
    res = runTrial(e.data);
    str = dieToString(res);

    if (Object.keys(rollResults).includes(str)) {
      rollResults[str] += 1;
    }
    else {
      rollResults[str] = 1;
    }
    rollAggregate = addDice([rollAggregate, res]);
    if (i % 1000 == 0) {
      postMessage({
          rollResults: rollResults,
          rollAggregate: rollAggregate,
          trials: i
      }); 
    }
  }
  postMessage({
        rollResults: rollResults,
        rollAggregate: rollAggregate,
        trials: e.data.trials
  }); 

  close();
}

runTrial = (e) => {
  let dice = [];
  for (let i = 0; i < e.green; i++) dice.push(rollDie(GREEN));
  for (let i = 0; i < e.yellow; i++) dice.push(rollDie(YELLOW));
  for (let i = 0; i < e.purple; i++) dice.push(rollDie(PURPLE));
  for (let i = 0; i < e.red; i++) dice.push(rollDie(RED));
  for (let i = 0; i < e.blue; i++) dice.push(rollDie(BLUE));
  for (let i = 0; i < e.black; i++) dice.push(rollDie(BLACK));

  return addDice(dice);
}

rollDie = (die) => { 
  return die[Math.floor(Math.random() * die.length)];
};

addDice = (dice) => {
  return dice.reduce((res, die) => {
    for (let key in die) {
      res[key] += die[key];
    }
    return res;
  }, emptyDie());
}

emptyDie = () => {
  return {
    passFail: 0,
    advantageThreat: 0,
    jedi: 0,
    despair: 0,
  }
};

dieToString = (die) => {
  let res = '';
  if (die.passFail > 0) { for (let i = 0; i < die.passFail; i++) res += 'S'; }
  if (die.passFail < 0) { for (let i = 0; i < -1 * die.passFail; i++) res += 'F'; }
  if (die.advantageThreat > 0) { for (let i = 0; i < die.passFail; i++) res += 'A'; }
  if (die.advantageThreat < 0) { for (let i = 0; i < -1 * die.passFail; i++) res += 'T'; }
  if (die.jedi > 0) { for (let i = 0; i < die.passFail; i++) res += 'J'; }
  if (die.despair > 0) { for (let i = 0; i < die.passFail; i++) res += 'D'; }

  return (res === '') ? '()' : res;
}

const GREEN = [
  {},
  {passFail: 1},
  {passFail: 1},
  {advantageThreat: 1},
  {advantageThreat: 1},
  {passFail: 1, advantageThreat: 1},
  {passFail: 1, advantageThreat: 1},
  {passFail: 2},
  {advantageThreat: 2}
];

const YELLOW = [
  {},
  {passFail: 1},
  {passFail: 1},
  {advantageThreat: 1},
  {passFail: 1, advantageThreat: 1},
  {passFail: 1, advantageThreat: 1},
  {passFail: 1, advantageThreat: 1},
  {passFail: 2},
  {passFail: 2},
  {advantageThreat: 2},
  {advantageThreat: 2},
  {jedi: 1}
];

const PURPLE = [
  {},
  {passFail: -1},
  {advantageThreat: -1},
  {advantageThreat: -1},
  {advantageThreat: -1},
  {passFail: -2},
  {passFail: -1, advantageThreat: -1},
  {advantageThreat: -2}
];

const RED = [
  {},
  {passFail: -1},
  {passFail: -1},
  {advantageThreat: -1},
  {advantageThreat: -1},
  {passFail: -1, advantageThreat: -1},
  {passFail: -1, advantageThreat: -1},
  {passFail: -2},
  {passFail: -2},
  {advantageThreat: -2},
  {advantageThreat: -2},
  {despair: 1}
];

const BLUE = [
  {},
  {},
  {passFail: 1},
  {advantageThreat: 1},
  {passFail: 1, advantageThreat: 1},
  {advantageThreat: 2}
];

const BLACK = [
  {},
  {},
  {passFail: -1},
  {passFail: -1},
  {advantageThreat: -1},
  {advantageThreat: -1}
];