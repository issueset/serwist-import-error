async function f1() {
  console.log("f1");
  const { f2 } = await import("./f2");
  f2();
}

export { f1 };
