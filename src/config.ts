const INLINED_ENVS = {
  NEXT_PUBLIC_GRAPHQL_ENDPOINT: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  NEXT_PUBLIC_MONETIZATION_API_KEY:
    process.env.NEXT_PUBLIC_MONETIZATION_API_KEY,
};

export class Config {
  static getEnv(variable: string) {
    const value = INLINED_ENVS[variable] || process.env[variable];

    if (!value) {
      throw new Error(`Missing environment variable: ${variable}`);
    }

    return value;
  }
}
