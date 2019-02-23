import { Pair } from 'utils/Pair';
import { useSpring } from 'react-spring';
import Denque from 'denque';
import * as d3 from 'd3';
import clamp from 'utils/clamp';
import { useMemo, useRef } from 'react';
import { newEffect } from 'utils/canvas';
import { required, defaults, declare } from 'utils/DefaultProps';

const Args = declare(
  required<{
    scaleX: d3.ScaleLinear<number, number>;
    scaleY: d3.ScaleLinear<number, number>;
    buffer: Denque<Pair>;
  }>(),
  defaults({
    // fraction of timespan to extend memory by for vertical autoscaling
    extraHistory: 0,
    maxPoints: 100,
  })
);

export const useView = Args.wrap(
  ({ scaleX, scaleY, buffer, extraHistory, maxPoints }) => {
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
      currentScaleX.domain(scaleX.domain().map(x => x + now));
      const [start, end] = currentScaleX.domain();
      const timespan = end - start;

      // Find indices in buffer corresponding to [start, end] times.
      const history = extraHistory * timespan;
      const left = bisector.left(buffer, start - history);
      const right = bisector.right(buffer, end, left);

      // Pad indices a little so the edge-jitter of the spline is not visible
      const pad = 2;
      const padRight = clamp(right + pad, [, buffer.length]);
      const padLeft = clamp(left - pad, [0]);

      // Calculate the stride to enforce maxPoints
      const stride = clamp(Math.ceil((padRight - padLeft) / maxPoints), [1]);

      // Slice the view of the buffer
      const view = buffer
        .slice(padLeft, padRight)
        .filter(
          (_, i, { length }) => i < pad || i >= length - pad || i % stride == 0
        );

      // Set y-axis scaling for view
      if (view.length) {
        update({ extent: d3.extent(view, d => d[1]) as Pair });
      }
      scaleY.domain(extent.value);
      transformed.current = view.map(
        ([x, y]): Pair => [currentScaleX(x), scaleY(y)]
      );
    });

    return [transformed, effect] as [typeof transformed, typeof effect];
  }
);
