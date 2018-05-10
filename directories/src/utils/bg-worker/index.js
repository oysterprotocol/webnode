export const spawnWorker = () => new Worker("./_worker");

/**
 * Performs a the function in a background worker. The worker param is optional.
 * If not provided, a new worker is spawned. If provided, the worker is used
 * to perform a task. The caller is responsible for not spawning too many
 * workers which could bog down the system with context switching overhead.
 * @returns promise that will resolve once the task is complete.
 */
export const performTask = (taskFn, worker) =>
  new Promise((resolve, reject) => {
    if (!worker) worker = new Worker("./_worker");

    const currTaskId = `${Date.now()}-${Math.random()}`;
    worker.postMessage({ taskFn, taskId: currTaskId });

    worker.onmessage = ({ data: { taskId, result, error } }) => {
      if (taskId !== currTaskId) return;
      if (error) return reject(error);

      return resolve(result);
    };
  });

// Simple wrapper
export const terminate = worker => worker.terminate();
