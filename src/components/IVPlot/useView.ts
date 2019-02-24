import { Pair } from 'utils/Pair';
import { useSpring, OpaqueInterpolation, SetUpdateFn } from 'react-spring';
import Denque from 'denque';
import * as d3 from 'd3';
import clamp from 'utils/clamp';
import { useMemo, useRef } from 'react';
import { newEffect } from 'utils/canvas';
import { required, defaults, declare } from 'utils/DefaultProps';
import { REF } from 'utils/easier';

const Args = declare(
  required<{
    scaleX: d3.ScaleLinear<number, number>;
    scaleY: d3.ScaleLinear<number, number>;
    buffer: Denque<Pair>;
    padding: {
      by: OpaqueInterpolation<number>;
      update: SetUpdateFn<{ by: number }>;
      immediate: REF<number>;
    };
  }>(),
  defaults({
    // fraction of timespan to extend memory by for vertical autoscaling
    extraHistory: 0,
  })
);

export const useView = Args.wrap(
  ({ scaleX, scaleY, buffer, extraHistory, padding }) => {
    const [{ extent }, update] = useSpring(() => ({
      extent: [0, 0],
      config: { tension: 60, friction: 10 },
    }));
    const currentScaleX = scaleX.copy();
    const bisector = useMemo(() => d3.bisector((d: Pair) => d[0]), []);
    const transformed = useRef([] as Pair[]);

    const effect = newEffect(() => {
      // Adjust the input scale domain for current time.
      const now = Date.now();
      currentScaleX.domain(
        scaleX.domain().map(x => x + now - padding.by.value)
      );
      const [start, end] = currentScaleX.domain();
      const timespan = end - start;

      // Find indices in buffer corresponding to [start, end] times.
      const history = extraHistory * timespan;
      const left = bisector.left(buffer, start - history);
      const right = bisector.right(buffer, end, left);

      // Pad indices a little so the edge-jitter of the spline is not visible.
      const pad = 2;
      const padRight = clamp(right + pad, [, buffer.length]);
      const padLeft = clamp(left - pad, [0]);

      // Calculate error in padding (if padRight was ineffective)
      const unpadRight = clamp(padRight - 2, [0]);
      if (buffer.length) {
        const by = buffer[right - 1][0] - buffer[unpadRight - 1][0];
        padding.immediate.current = clamp(by, [padding.immediate.current]);
        padding.update({ by: padding.immediate.current });
      }

      // Slice the view of the buffer.
      let view = buffer.slice(padLeft, padRight);

      // TODO: If I have a lot of free time, add striding to the view, with consistent phase.

      // Set y-axis scaling for view
      if (view.length) {
        update({ extent: d3.extent(view, d => d[1]) as Pair });
      }

      Object.assign(window, {
        extent: extent.value,
        timespan,
        left,
        right,
        buffer,
        hist: history,
        start,
        end,
        now,
        length: transformed.current.length,
        transformed,
      });
      // debugger;
      scaleY.domain(extent.value);
      transformed.current = view.map(
        ([x, y]): Pair => [currentScaleX(x), scaleY(y)]
      );
    });

    return { view: transformed, update: effect, scaleX: currentScaleX };
  }
);
