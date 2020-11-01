import { makeSchema } from '@nexus/schema';
import path from 'path';
import * as types from 'src/types';

export const schema = makeSchema({
  types,
  outputs: {
    schema: path.join(process.cwd(), "schema.graphql"),
    typegen: path.join(process.cwd(), "src", "generated", "nexus.ts")
  },
  typegenAutoConfig: {
    sources: [
      {
        alias: "faces",
        source: path.join(process.cwd(), "src", "interfaces.ts"),
        typeMatch: (type) => new RegExp(`(I${type})`)
      }
    ],
    debug: process.env.NODE_ENV === 'development'
  }
});