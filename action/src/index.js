function run() {
  let foo = process.env.INPUT_FOO;
  let bar = process.env.INPUT_BAR;
  let hoge = process.env.INPUT_HOGE;
  let fuga = process.env.INPUT_FUGA;

  console.log(`foo: ${foo}`);
  console.log(`bar: ${bar}`);
  console.log(`hoge: ${hoge}`);
  console.log(`fuga: ${fuga}`);
}

run();
