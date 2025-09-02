import dotenv from 'dotenv';

dotenv.config();

const environment = {
  port: process.env.PORT || '3000',
  jwtSecret: process.env.JWT_SECRET || 'default-secret',
  datbaseUrl: process.env.TURSO_DEVELOPMENT_URL || 'libsql://taxi-dev-hache.aws-us-east-1.turso.io',
  databaseToken: process.env.TURSO_DEVELOPMENT_TOKEN  || 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJleHAiOjE3NzU0MTAwNjAsImlhdCI6MTc0Mzg3NDA2MCwiaWQiOiI4ZmE3NmI0OS1iOTZkLTQ2ODEtODdmMC1hZjE3ZTkwYzFiMDkiLCJyaWQiOiJmMmYxNjRjZC1jODNkLTRmOTMtOTlhNy0xM2VjNDQ5NzljZGIifQ.Z_tX82SlK0D5WMMWiLjZIGC0Gx3gx7336-FC1pUnK3o-0vKmijYylCMBc-Pp2EA_Wnkgv6jTDTeQODtlDwMrBw',
  nodeEnv: process.env.NODE_ENV || 'development',
};

export default environment;