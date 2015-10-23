let config = {
  //Should new job be triggered after previos has finished
  isRepeating: true,

  //Base url to send request with payload for all jobs
  baseUrl: null,

  //Remove job from queue after it's done
  removeOnComplete: false,

  //Delay between current and next job to be triggered
  delay: 10000,

  //Time to live for each job, will be removed after ttl is finished
  ttl: 16000,

  //Priority of job
  priority: 'high',

  //Removes delayed jobs on start
  removeDelayedJobs: true,

  //Removes active jobs on start
  removeActiveJobs: true,

  kue: {
    //Port for Kue web interface, set to false to deactivate
    port: 3000
  }
}

export default config;
