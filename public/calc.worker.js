function normRandom(mean, standardDerivation) {
  let x, y, r;
  do {
    x = 2 * Math.random() - 1.0;
    y = 2 * Math.random() - 1.0;
    r = x ** 2 + y ** 2;
  } while (r >= 1.0);
  const z = Math.sqrt(-2.0 * Math.log(r) / r);
  return mean + standardDerivation * y * z;
}

onmessage = function(e) {
  let E1;
  let E0 = parseFloat(e.data.Einit);
  const eps = parseFloat(e.data.eps);
  const A = parseInt(e.data.A);
  const Et = parseFloat(e.data.Et);

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
    const mean = Math.sqrt(parseInt(e.data.decelerator));
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
  postMessage(res);
};