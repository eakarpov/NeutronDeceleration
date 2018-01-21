onmessage = function (e) {
  const res = e.data;
  const arr = [];
  res.forEach((e, i) => {
    if (i > 0) {
      const p = res[res.indexOf(e) - 1];
      arr.push(Math.sqrt((e.x - p.x) * (e.x - p.x) + (e.y - p.y) * (e.y - p.y)));
    }
  });
  const result = arr.reduce((p,c) => p + c) / arr.length;
  postMessage(result);
}