import * as core from "@actions/core";

function run() {
  let foo = core.getInput("foo");
  let bar = core.getInput("bar");
  let hoge = core.getInput("hoge");

  console.log(`foo: ${foo}`);
  console.log(`bar: ${bar}`);
  console.log(`hoge: ${hoge}`);
}

run();
