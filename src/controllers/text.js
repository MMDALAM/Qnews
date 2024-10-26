const exec = require('exec-sh');

const main = async () => {
  console.log('1');

  exec('python3 test.py', function (err) {
    if (err) {
      console.log('Error: ', err);
      return;
    }
    console.log('Command executed successfully!');
  });
};

setInterval(() => {
  main();
}, 1000);
