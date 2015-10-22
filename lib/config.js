let config = {
  isRepeating: true,
  baseUrl: '',

  kue: {
    removeOnComplete: true,
    delay: 1000,
    ttl: 16000,
    priority: 'high'
  }
}

export default config;
