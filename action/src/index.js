function run() {
  let foo = process.env.INPUT_FOO;
  let bar = process.env.INPUT_BAR;
  let hoge = process.env.INPUT_HOGE;

  console.log(`foo: ${foo}`);
  console.log(`bar: ${bar}`);
  console.log(`hoge: ${hoge}`);
}

run();
