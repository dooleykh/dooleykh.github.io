let startTrials = document.getElementById('startTrials');

startTrials.onclick = () => {
  let greenCount = document.getElementById('greenCount').value;
  let yellowCount = document.getElementById('yellowCount').value;
  let purpleCount = document.getElementById('purpleCount').value;
  let redCount = document.getElementById('redCount').value;
  let blueCount = document.getElementById('blueCount').value;
  let blackCount = document.getElementById('blackCount').value;

  let simulator = new Worker('js/swrpg/worker.js');
  simulator.postMessage(
    {
      green: document.getElementById('greenCount').value,
      yellow: document.getElementById('yellowCount').value,
      purple: document.getElementById('purpleCount').value,
      red: document.getElementById('redCount').value,
      blue: document.getElementById('blueCount').value,
      black: document.getElementById('blackCount').value,

      trials: document.getElementById('trialCount').value
    }
  );

  simulator.onmessage = (e) => {
    document.getElementById('chart').innerHTML = '';

    let rolls = [];
    Object.keys(e.data.rollResults)
      .sort((a, b) => e.data.rollResults[b] - e.data.rollResults[a])
      .forEach((str) => {
      rolls.push([str,e.data.rollResults[str]]);
    });

    d3.select(".chart")
    .text('Trials: ' + e.data.trials)
    .selectAll("div")
    .data(rolls)
    .enter().append("div")
      .style("width", (d) => { return d[1] / e.data.trials * 750 + "px"; })
      .text((d) => { return d[0] + " " + d[1]; });
  }
}