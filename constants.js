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

module.exports = deceleratorConstants;
