process.on('message', (msg) => {
  if (msg.start) {
    const constants = require('./constants');
    const deceleratorConstants = constants[process.argv[2]];
    const A = deceleratorConstants[0];
    const Et = parseFloat(process.argv[4]);
    const a = (A - 1.0) / (A + 1.0);
    const eps = a * a;

    let E0 = parseFloat(process.argv[3]) * 1e6;
    let E1;
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
      const normRandom = require('./normal_distribution');
      const mean = Math.sqrt(deceleratorConstants[1]);
      const length = normRandom(mean, mean / 3.5);
      console.log(length);
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
    } while (E1 - Et > 0.0001);
    res = [...res.slice(0, res.length - 1)];

    // // average reducing
    // const arr = [];
    // res.forEach((e, i) => {
    //   if (i > 0) {
    //     arr.push(e.e / res[res.indexOf(e) - 1].e);
    //   }
    // });
    // const r = arr.reduce((p,c) => p + c) / arr.length;
    // console.log(r);
    // // --end

    process.send({terminate: true, data: JSON.stringify(res)});
  }
});