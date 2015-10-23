let config = {
  isRepeating: true,
  baseUrl: null,
  removeOnComplete: false,
  delay: 1000,
  ttl: 16000,
  priority: 'high',
  removeDelayedJobs: true,
  removeActiveJobs: true,

  kue: {
    port: 3000
  }
}

export default config;
