export default async (func, ...args) => {
  return await new Promise((resolve, reject) => {
    func.call(this, ...args, (err, answer) => {
      if (err !== null) {
        reject(err);
      }
      resolve(answer);
    })
  });
}