async function f1() {
  console.log("f1");
  const { f2 } = await import("./f2.js");
  f2();
}

export { f1 };
