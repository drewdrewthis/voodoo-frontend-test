import { ApolloClient, InMemoryCache } from "@apollo/client";
import { Config } from "@/config";

export const client = new ApolloClient({
  uri: Config.getEnv("NEXT_PUBLIC_GRAPHQL_ENDPOINT"),
  headers: {
    Authorization:
      "Bearer " + Config.getEnv("NEXT_PUBLIC_MONETIZATION_API_KEY"),
    "Content-Type": "application/json",
  },
  cache: new InMemoryCache(),
});
