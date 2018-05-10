this.onmessage = ({ data: { taskFn, taskId } }) => {
  try {
    Promise.resolve(taskFn())
      .then(result => {
        this.postMessage({ taskId, result });
      })
      .catch(err => {
        throw err;
      });
  } catch (error) {
    this.postMessage({ taskId, error });
  }
};
