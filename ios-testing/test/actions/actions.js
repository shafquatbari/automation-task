class Actions {
  async scroll(direction, duration = 2000) {
    await driver.execute("mobile: scroll", { direction });
    await browser.pause(duration);
  }

  async hideKeyboard() {
    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: 200, y: 200 },
          { type: "pointerDown" },
          { type: "pointerUp" },
        ],
      },
    ]);
  }
}

module.exports = new Actions();
