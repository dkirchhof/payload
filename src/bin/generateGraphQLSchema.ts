/* eslint-disable no-nested-ternary */
import fs from 'fs';
import { printSchema } from 'graphql';
import Logger from '../utilities/logger';
import loadConfig from '../config/load';
import payload from '..';

export async function generateGraphQLSchema(): Promise<void> {
  const logger = Logger();
  const config = await loadConfig();

  await payload.init({
    secret: '--unused--',
    mongoURL: false,
    local: true,
  });

  logger.info('Compiling GraphQL schema...');

  const outputFile = config.graphQL.schemaOutputFile;
  const schema = printSchema(payload.schema);

  if (Array.isArray(outputFile)) {
    outputFile.forEach(out => {
      fs.writeFileSync(out, schema);
      logger.info(`GraphQL written to ${out}`);
    });
  } else {
    fs.writeFileSync(outputFile, schema);
    logger.info(`GraphQL written to ${outputFile}`);
  }
}

// when generateGraphQLSchema.js is launched directly
if (module.id === require.main.id) {
  generateGraphQLSchema();
}
