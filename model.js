const napa = require('napajs');
const constants = require('./constants');
const normRandom = require('./normal_distribution');

const NUMBER_OF_WORKERS = 4;

process.on('message', (msg) => {
  if (msg.start) {

    const amount = process.argv[5];
    const deceleratorConstants = constants[process.argv[2]];
   
    const A = deceleratorConstants[0];
    const a = (A - 1.0) / (A + 1.0);
    const eps = a * a;
   
    const Et = parseFloat(process.argv[4]);
    const Einit = parseFloat(process.argv[3]) * 1e6;

    function calculation() {
      let E1;
      let E0 = this.Einit;
      
      const eps = this.eps;
      const A = this.A;
      const Et = this.Et;
      console.log(E0, eps, A, Et);
      let x = 0.0;
      let y = 0.0;
      let res = [{
        x,
        y,
        e: E0,
      }];
     
      do {
        let gamma;
        do {
          gamma = Math.random();
        } while (gamma <= 0.001 || 1.0 - gamma <= 0.001);
        const mean = Math.sqrt(deceleratorConstants[1]);
        const length = normRandom(mean, mean / 3.5);
        const cosTheta = 1.0 - 2.0 * gamma;
        const cosPsi = (A * cosTheta + 1.0) / Math.sqrt(A * A + 2.0 * A * cosTheta + 1.0);
        E1 = (E0 * ((1.0 + eps) + ((1.0 - eps) * cosTheta))) / 2.0;
        E0 = E1;
        const vert = Math.sqrt(1 - cosPsi * cosPsi);
        x = x + length * cosPsi;
        y = Math.floor(Math.random() * 1000) % 2 ? y + length * vert : y - length * vert;
        res.push({
          x,
          y,
          e: E0,
        });
        console.log(E1);
      } while (E1 - Et > 0.0001);
      res = res.slice(0, res.length - 1);
      return res;
    }
    calculationBound = calculation.bind({ Einit, A, eps });

    function avrg(res) {
      const arr = [];
      res.forEach((e, i) => {
        if (i > 0) {
          const p = res[res.indexOf(e) - 1];
          arr.push(Math.sqrt((e.x - p.x) * (e.x - p.x) + (e.y - p.y) * (e.y - p.y)));
        }
      });
      return arr.reduce((p,c) => p + c) / arr.length;
    }
    const zone = napa.zone.create('first', { workers: NUMBER_OF_WORKERS} );
    const secondZone = napa.zone.create('second', { workers: NUMBER_OF_WORKERS});
    const promises = [];

    for (let i = 0; i < amount; i++) {
      try {
      promises[i] = zone.execute(calculationBound);
      promises[i].then(res => {
        console.log(res);
      });
      console.log(promises[i]);
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
        prms[j] = secondZone.execute(avrg, [result[j]]);

      res.avrg = {};
      res.avrg.eDec = (E0 - Et) / result.length;
      res.avrg.logEDec = Math.log(E0 - Et) / result.length;
      Promise.all(prms).then(avrg => {
        res.avrg.path = avrg.reduce((p,c) => p + c) / avrg.length;
        res.avrg.time = res.avrg.path * res.avrg.path / 6;
        process.send({terminate: true, data: JSON.stringify(res)});
      });
    }).catch(err => console.log(err));

  }
});