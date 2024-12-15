// Demo spec file 2

// A passing test
describe("A passing test 2", () => {
  it("should pass", async () => {
    await expect(true).toBe(true);
  });

  it("should fail", async () => {
    await expect(true).toBe(false);
  });

});
