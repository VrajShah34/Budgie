/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.jsx",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:KXMrxf5dG6ls@ep-winter-credit-a55e6ehf.us-east-2.aws.neon.tech/Budgie?sslmode=require',
    }
  };