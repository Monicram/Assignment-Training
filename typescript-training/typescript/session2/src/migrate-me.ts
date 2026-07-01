
const cache: Record<string, User> = {};

interface User {
  id: string;
  [key: string]: unknown;
}

function fetchUserFromCache(id: string): User | null {
  return cache[id] || null;
}

function saveUserToCache(user: User): void {
  cache[user.id] = user;
}

function processUsers<T, U>(
  users: T[],
  filterFn: (user: T) => boolean,
  transformFn: (user: T) => U
): U[] {
  return users.filter(filterFn).map(transformFn);
}

function buildQueryString(
  params: Record<string, string | number | boolean>
): string {
  return Object.keys(params)
    .map(function (key) {
      return key + "=" + encodeURIComponent(String(params[key]));
    })
    .join("&");
}

function retry<T>(
  fn: () => Promise<T>,
  maxAttempts: number,
  delay: number
): Promise<T> {
  return new Promise<T>(function (resolve, reject) {
    let attempt = 0;

    function run(): void {
      attempt++;

      fn()
        .then(resolve)
        .catch(function (err) {
          if (attempt >= maxAttempts) {
            reject(err);
          } else {
            setTimeout(run, delay);
          }
        });
    }

    run();
  });
}

export = {
  fetchUserFromCache,
  saveUserToCache,
  processUsers,
  buildQueryString,
  retry
};

// retry<T> preserves the type returned by fn.
// If fn returns Promise<User>, retry returns Promise<User>.