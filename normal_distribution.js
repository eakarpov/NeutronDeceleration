export default nextNormalDistributedValue = (mean, standardDerivation) => {
  // Polar Box-Muller transformation.
  let x, y, r;
  do {
    x = 2 * Math.random() - 1.0;
    y = 2 * Math.random() - 1.0;
    r = x ** 2 + y ** 2;
  } while (r >= 1.0);
  const z = Math.sqrt(-2.0 * Math.log(r) / r);
  return mean + standardDerivation * y * z;
};
