import { describe, it, expect, beforeEach } from "vitest";
import { SessionLogger } from "../session-logger";

describe("SessionLogger", () => {
  let logger: SessionLogger;

  beforeEach(() => {
    logger = new SessionLogger();
  });

  it("returns false for an intern who has not been recorded", () => {
    expect(logger.isPresent(1)).toBe(false);
  });

  it("returns true after an intern is recorded", () => {
    logger.record(1);

    expect(logger.isPresent(1)).toBe(true);
  });

  it("counts attendees correctly", () => {
    logger.record(1);
    logger.record(2);
    logger.record(3);

    expect(logger.getCount()).toBe(3);
  });

  it("recording the same intern twice does not change the count", () => {
    logger.record(1);
    logger.record(1);

    expect(logger.getCount()).toBe(1);
  });

  it("returns all attendee IDs without exposing the internal collection", () => {
    logger.record(1);
    logger.record(2);
    logger.record(3);

    const ids = logger.getAttendeeIds();

    ids.push(999);

    expect(logger.getCount()).toBe(3);
    expect(logger.isPresent(999)).toBe(false);
  });
});