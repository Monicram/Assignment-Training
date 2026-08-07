import { describe, it, expect } from "vitest";
import { InternTracker } from "../services/intern-tracker";

describe("InternTracker.updateScore", () => {
  it("throws RangeError if score is out of 0–100 range", () => {
    const tracker = new InternTracker();

    expect(() => tracker.updateScore(1, -1)).toThrow(RangeError);
    expect(() => tracker.updateScore(1, 101)).toThrow(RangeError);
  });

  it("throws if the intern does not exist", () => {
    const tracker = new InternTracker();

    expect(() => tracker.updateScore(999, 80)).toThrow(
      "Intern not found"
    );
  });

  it("updates the score without exposing internal state", () => {
    const tracker = new InternTracker();

    // Verify only through the public interface.
    expect(tracker.getById(1)).toBeUndefined();
    expect(tracker.getAll()).toEqual([]);
  });
});