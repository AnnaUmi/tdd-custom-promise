class CustomPromise {
  constructor(executor) {
    executor();
  }
  then() {}
  catch() {}
  finally() {}
}
module.exports = CustomPromise;
