export interface ISessionLogger {
  record(id: number): void;
  isPresent(id: number): boolean;
  getCount(): number;
  getAttendeeIds(): number[];
}

export class SessionLogger implements ISessionLogger {
  // Private storage
  #attendees = new Set<number>();

  // Record an intern's attendance
  record(id: number): void {
    this.#attendees.add(id);
  }

  // Check if an intern attended
  isPresent(id: number): boolean {
    return this.#attendees.has(id);
  }

  // Get total number of attendees
  getCount(): number {
    return this.#attendees.size;
  }

  // Return a copy of attendee IDs
  getAttendeeIds(): number[] {
    return [...this.#attendees];
  }
}

/*
1.
Yes. The private storage could be changed from Set<number>
to Map<number, Date> without changing the public interface.
This shows encapsulation because callers only depend on the
public methods.

2.
If the raw Set were exposed, callers could directly call
add(), delete(), clear(), or modify the collection,
bypassing the class methods and breaking encapsulation.
*/