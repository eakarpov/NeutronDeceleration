process.on('message', (msg) => {
  if (msg.start) {
    const A = parseInt(process.argv[2], 10);
    const Et = parseFloat(process.argv[4]);
    const a = (A - 1.0) / (A + 1.0);
    const eps = a * a;

    let E0 = parseFloat(process.argv[3]);
    let E1;
    let x = 0.0;
    let y = 0.0;
    let res = [{
      x,
      y,
      e: E0,
    }];

    do {
      let gamma = Math.random();
      if (gamma === 0 || gamma === 1) gamma = Math.random();
      const length = Math.random();
      const cosTheta = 1.0 - 2.0 * gamma;
      const cosPsi = (A * cosTheta + 1.0) / Math.sqrt(A * A + 2.0 * A * cosTheta + 1.0);
      E1 = (E0 * ((1.0 + eps) + ((1.0 - eps) * cosTheta))) / 2.0;
      E0 = E1;
      x = x + length * cosPsi;
      y = length * length - x * x;
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