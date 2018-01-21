
const meanSquareOfDisplacement = {
  "H2O": 6 * 27,
  "D2O": 6 * 120,
  "Be": 6 * 98,
  "BeO": 6 * 105,
  "C": 6 * 350
};

const deceleratorConstants = {
  0: [18, meanSquareOfDisplacement["H2O"]],
  1: [20, meanSquareOfDisplacement["D2O"]],
  2: [4, meanSquareOfDisplacement["Be"]],
  3: [20, meanSquareOfDisplacement["BeO"]],
  4: [14, meanSquareOfDisplacement["C"]]
};

onmessage = function(msg) {
  if (msg.data.start) {
    const args = msg.data.args;

    const amount = args[3];
    const A = deceleratorConstants[args[0]][0];
    const a = (A - 1.0) / (A + 1.0);
    const eps = a * a;

    const Et = parseFloat(args[2]);
    const Einit = parseFloat(args[1]) * 1e6;

    const promises = [];

    for (let i = 0; i < amount; i++) {
      try {
        promises[i] = new Promise((res, rej) => {
          const newW = new Worker('calc.worker.js');
          newW.postMessage({
            decelerator: deceleratorConstants[args[0]][1],
            E0: Einit,
            eps,
            A,
            Et
          });
          newW.onmessage = function (e) {
            console.log(e);
            res(e.data);
          };
        });
      } catch(e) {
        console.log(e);
      }
    }

    Promise.all(promises).then(result => {
      console.log(result);
      const res = {};
      res.trace = result[0];
      const prms = [];

      for (let j = 0; j < result.length; j++)
        prms[j] = new Promise((res, rej) => {
          const newW = new Worker('avrg.worker.js');
          newW.postMessage([result[j]]);
          newW.onmessage = function (e) {
            console.log(e);
            res(e.data)
          };
        });

      res.avrg = {};
      res.avrg.eDec = (E0 - Et) / result.length;
      res.avrg.logEDec = Math.log(E0 - Et) / result.length;
      Promise.all(prms).then(avrg => {
        res.avrg.path = avrg.reduce((p,c) => p + c) / avrg.length;
        res.avrg.time = res.avrg.path * res.avrg.path / 6;
        postMessage({terminate: true, data: JSON.stringify(res)});
      });
    }).catch(err => console.log(err));

  }
};