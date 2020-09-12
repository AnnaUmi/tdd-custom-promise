const CustomPromise = require("./promise");
describe("custom promise: ", () => {
  let promise;
  let executorSpy;
  const successResult = 42;
  const errorResult = "Promis failed";
  beforeEach(() => {
    executorSpy = jest.fn((resolve) =>
      setTimeout(() => resolve(successResult), 1500)
    );
    promise = new CustomPromise(executorSpy);
  });
  test("should be typeof function", () => {
    expect(CustomPromise).toBeDefined();
    expect(typeof CustomPromise).toBe("function");
  });
  test("custom promise should have methods: then, catch, finally", () => {
    expect(promise.then).toBeDefined();
    expect(promise.catch).toBeDefined();
    expect(promise.finally).toBeDefined();
  });
  test("should immediately call executor function", () => {
    expect(executorSpy).toHaveBeenCalled();
  });
  test("should extract data in then methid and chain it", async () => {
    const res = await promise.then((n) => n).then((n) => n * 2);
    expect(res).toBe(successResult * 2);
  });
  test("should catch error", () => {
    const errorExecutor = (_, reject) =>
      setTimeout(() => reject(errorResult), 1500);
    const errorPromise = new CustomPromise(errorExecutor);
    return new Promise((resolve) => {
      errorPromise.catch((error) => {
        expect(error).toBe(errorResult);
        resolve();
      });
    });
  });
  test("should call finally method", async () => {
    const finallySpy = jest.fn(() => {});
    await promise.finally(finallySpy);
    expect(finallySpy).toHaveBeenCalled();
  });
});
