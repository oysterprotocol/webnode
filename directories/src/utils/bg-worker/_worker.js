this.onmessage = ({ data: { taskFn, taskId } }) => {
  try {
    const result = taskFn();
    this.postMessage({ taskId, result });
  } catch (error) {
    this.postMessage({ taskId, error });
  }
};
