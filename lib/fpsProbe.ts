/**
 * Measure the real frame rate for `durationMs` and resolve with the average FPS.
 *
 * Used as a runtime safety net: if a device passes the static capability checks
 * but still renders the heavy WebGL background slowly, we can downgrade it to
 * `lite` and fall back to the static gradient. Sample while the effect is
 * actually running so the reading reflects real load.
 */
export function probeFps(durationMs = 1000): Promise<number> {
  if (typeof window === "undefined" || typeof performance === "undefined") {
    return Promise.resolve(60);
  }
  return new Promise((resolve) => {
    const start = performance.now();
    let frames = 0;
    const tick = (now: number) => {
      frames += 1;
      const elapsed = now - start;
      if (elapsed >= durationMs) {
        resolve((frames * 1000) / elapsed);
        return;
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}
