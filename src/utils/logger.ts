let log = (...val: any) => {};

// Add if PROD, give an empty function to log
// OR add bundle configuration to remove console logs on bundling

if (__DEV__) {
    log = console.log;
}

export { log };
