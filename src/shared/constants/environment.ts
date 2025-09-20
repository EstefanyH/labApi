import dotenv from 'dotenv';

dotenv.config();

const environment = {
  port: process.env.PORT || '3000',
  jwtSecret: process.env.JWT_SECRET || 'default-secret',
  datbaseUrl: process.env.TURSO_DEVELOPMENT_URL || 'libsql://lab-dev-hache.aws-eu-west-1.turso.io',
  databaseToken: process.env.TURSO_DEVELOPMENT_TOKEN  || 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJleHAiOjE3ODc3MTk1ODksImlhdCI6MTc1NjE4MzU4OSwiaWQiOiJjYTRmOTliYS0zZDI2LTRjODUtOTQ2Zi0yNGYzNzQ5MjYzYzQiLCJyaWQiOiI2YTIwNDBjNS02NTk2LTQ0ODItYWQ1Ni0xNmZkODA2ODQ0ZjUifQ.6RibLqFqD-A30wxtOZ77SZ7Sflhxjga3h-7L0FbYWuj5HpZUYIZbk3L8VPszDSu1P6oSeplsA_mhrstBlP1kCg',
  nodeEnv: process.env.NODE_ENV || 'local',
};

export default environment;