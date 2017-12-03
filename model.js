process.on('message', (msg) => {
  if (msg.start) {
    const A = process.argv[2];
    process.send({terminate: true, data: ''});
  }
});