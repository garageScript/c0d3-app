import type { ApolloServer } from 'apollo-server-micro'

export type Unpromisify<T> = T extends Promise<infer U> ? U : T

export type GraphQLTestResponse<T> = Omit<
  Unpromisify<ReturnType<ApolloServer['executeOperation']>>,
  'data'
> & { data: T }
