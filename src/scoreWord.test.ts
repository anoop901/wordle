import { scoreWord } from "./scoreWord";

test("one correct", () => {
  expect(scoreWord("fgchi", "abcde")).toStrictEqual([
    "absent",
    "absent",
    "correct",
    "absent",
    "absent",
  ]);
});

test("one misplaced", () => {
  expect(scoreWord("fgbhi", "abcde")).toStrictEqual([
    "absent",
    "absent",
    "misplaced",
    "absent",
    "absent",
  ]);
});

test("multiple in guess, single in target", () => {
  expect(scoreWord("ffeef", "abcde")).toStrictEqual([
    "absent",
    "absent",
    "misplaced",
    "absent",
    "absent",
  ]);
});

test("multiple in guess, single in target correct place", () => {
  expect(scoreWord("ffefe", "abcde")).toStrictEqual([
    "absent",
    "absent",
    "absent",
    "absent",
    "correct",
  ]);
});

test("ghost twine", () => {
  expect(scoreWord("ghost", "twine")).toStrictEqual([
    "absent",
    "absent",
    "absent",
    "absent",
    "misplaced",
  ]);
});
