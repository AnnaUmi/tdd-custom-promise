function noop() {}

class CustomPromise {
  constructor(executor) {
    this.queue = [];
    this.errorHandler = noop;
    this.finallyHandler = noop;

    try {
      executor.call(null, this.onResolve.bind(this), this.onReject.bind(this));
    } catch (error) {
      this.errorHandler(error);
    } finally {
      this.finallyHandler();
    }
  }
  onResolve(data) {
    this.queue.forEach((cb) => {
      data = cb(data);
    });
    this.finallyHandler();
  }
  onReject(error) {
    this.errorHandler(error);
    this.finallyHandler();
  }
  then(fn) {
    this.queue.push(fn);
    return this;
  }
  catch(fn) {
    this.errorHandler = fn;
    return this;
  }
  finally(fn) {
    this.finallyHandler = fn;
    return this;
  }
}
const promise = new CustomPromise((resolve, reject) => {
  setTimeout(() => {
    //resolve("Helo world");
    reject("aaa error");
  });
});
promise
  .then((res) => res.toUpperCase())
  .then((title) => console.log(title))
  .catch((err) => console.log("err", err))
  .finally(() => console.log("finally"));
module.exports = CustomPromise;
