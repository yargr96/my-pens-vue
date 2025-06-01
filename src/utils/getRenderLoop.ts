type FramesPerSecond = 'auto' | number;

export type RenderLoop = {
  run: () => void;
  stop: () => void;
  toggle: () => void;
  setFramesPerSecond: (fps: FramesPerSecond) => void;
}

type RenderLoopParams = {
  framesPerSecond?: FramesPerSecond;
}

const getTimeout = (framesPerSecond: number): number => 1000 / framesPerSecond;

export const createRenderLoop = () => {
  let loopSingleton: () => void;

  const getRenderLoop = (callback: () => void, {
    framesPerSecond = 'auto',
  }: RenderLoopParams = {}): RenderLoop => {
    let isRunning = false;
    let timerId: ReturnType<typeof setTimeout>;

    const getTimeoutFunction = (fps: FramesPerSecond) => (fps === 'auto'
      ? requestAnimationFrame
      : (recursiveCallback: () => void): void => {
        timerId = setTimeout(recursiveCallback, getTimeout(fps));
      });

    let timeoutFunction = getTimeoutFunction(framesPerSecond);

    const loop = () => {
      if (loop !== loopSingleton || !isRunning) {
        return;
      }

      callback();

      timeoutFunction(loop);
    };

    loopSingleton = loop;

    const run = () => {
      if (isRunning) {
        return;
      }

      isRunning = true;
      loop();
    };

    const stop = () => {
      isRunning = false;
      clearTimeout(timerId);
    };

    const toggle = () => {
      if (isRunning) {
        stop();
      } else {
        run();
      }
    };

    const setFramesPerSecond = (fps: FramesPerSecond) => {
      timeoutFunction = getTimeoutFunction(fps);
    };

    return {
      run,
      stop,
      toggle,
      setFramesPerSecond,
    };
  }

  return { getRenderLoop }
}

export const { getRenderLoop } = createRenderLoop();
