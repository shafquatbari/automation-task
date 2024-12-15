export const specs = {
  firstCase: "./test/specs/spec1.js",
  secondCase: "./test/specs/spec2.js",
  thirdCase: "./test/specs/spec3.js",
  fourthCase: "./test/specs/spec4.js",
};

export const suites = {
  all: [Object.values(specs)],
  firstSuite: [[specs.firstCase, specs.secondCase, specs.thirdCase]],
  secondSuite: [[specs.fourthCase]],
};
