declare global {
  namespace NodeJS {
    interface ProcessEnv {
      FIREBASE_DATABASE_EMULATOR_HOST: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
