function run() {
  let foo = env.INPUT_FOO;
  let bar = env.INPUT_BAR;
  let hoge = env.INPUT_HOGE;

  console.log(`foo: ${foo}`);
  console.log(`bar: ${bar}`);
  console.log(`hoge: ${hoge}`);
}

run();
