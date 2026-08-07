export interface Intern {
  id: number;
  name: string;
  score: number;
}

class InternTracker {
  // Private fields
  #interns: Intern[] = [];
  #apiUrl: string = "/api/interns";
  #lastFetchedAt: Date = new Date(0);
  #localCache: Map<number, Intern> = new Map();

  // Public method
  async loadAll(): Promise<void> {
    const res = await fetch(this.#apiUrl);
    this.#interns = await res.json();

    this.#localCache.clear();

    for (const intern of this.#interns) {
      this.#updateCache(intern);
    }

    this.#lastFetchedAt = new Date();
  }

  // Public method
  getAll(): readonly Intern[] {
    return this.#interns;
  }

  // Public method
  getById(id: number): Intern | undefined {
    return this.#localCache.get(id);
  }

  // Section 3 - Validated Setter
  updateScore(internId: number, score: number): void {
    // Validate score
    if (score < 0 || score > 100) {
      throw new RangeError("Score must be between 0 and 100");
    }

    // Find intern
    const intern = this.#interns.find(
      (intern) => intern.id === internId
    );

    // Throw error if intern doesn't exist
    if (!intern) {
      throw new Error("Intern not found");
    }

    // Update score
    intern.score = score;

    // Update cache
    this.#updateCache(intern);
  }

  // Private helper
  #buildUrl(id: number): string {
    return `${this.#apiUrl}/${id}`;
  }

  // Private helper
  #updateCache(intern: Intern): void {
    this.#localCache.set(intern.id, intern);
  }
}

export { InternTracker };


// Section 1
// 1
// Callers should not directly access any fields.
// They should use getAll() and getById() instead.
//
// The following fields should be private:
// - interns
// - apiUrl
// - lastFetchedAt
// - _localCache
//
// 2
// The following methods are internal helper methods
// and should not be called directly:
// - _buildUrl()
// - _updateCache()
//
// 3
// The following module-level exports are implementation details:
// - API_KEY
// - DEFAULT_LIMIT
// They should not be exported.
//
// 4
// If the project changes from a REST API to a local JSON file,
// these implementation details would change:
// - apiUrl
// - fetch(this.apiUrl)
// - _buildUrl()
//
// Callers would not break because they interact only
// with the public interface (loadAll, getAll, getById).