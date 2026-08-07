class ConfigManager {
  private static instance: ConfigManager | null = null;
  private config: Record<string, string> = {};

  private constructor() {
    this.config["env"] = "development";
    this.config["host"] = "localhost";
    this.config["port"] = "3000";
  }

  public static getInstance(): ConfigManager {
    if (ConfigManager.instance === null) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  public set(key: string, value: string): void {
    this.config[key] = value;
  }

  public get(key: string): string {
    if (!(key in this.config)) {
      throw new Error(`Configuration key '${key}' does not exist.`);
    }
    return this.config[key];
  }
}

const config = ConfigManager.getInstance();
config.set("apiUrl", "http://localhost:3001");

const sameConfig = ConfigManager.getInstance();

console.log(sameConfig.get("apiUrl")); // http://localhost:3001
console.log(config === sameConfig);    // true

// Task 1.2
// If ConfigManager.get() returns an empty string instead of throwing an error,
// it causes a silent failure because the missing configuration is hidden.
// Throwing an error is safer because it follows the Fail Fast principle and
// immediately alerts the developer to fix the missing configuration.