import { Pair } from 'utils/Pair';
import { useMemoSpring } from 'utils/CustomHooks';
import Denque from 'denque';
import * as d3 from 'd3';
import clamp from 'utils/clamp';

export function useView(
  scaleX: d3.ScaleLinear<number, number>,
  scaleY: d3.ScaleLinear<number, number>,
  buffer: Denque<Pair>,
  seekOffset: number,
  timespan: number,
  samplePeriod: number,
  stride: number,
  // fraction of timespan to extend memory by for vertical autoscaling
  extraHistory = 0
) {
  // Set end time and x-axis scaling.
  const pad = 2; // extra samples to keep on edges
  const now = Date.now();
  const end = Math.min(now - seekOffset, now - pad * samplePeriod);
  const start = end - timespan;
  const bisector = d3.bisector((d: Pair) => d[0]);

  // Extra factor of 2 (kind of arbitrary) is to ensure target is included
  const history = extraHistory * timespan;
  const leftBound = clamp(
    Math.ceil(buffer.length - (2 * (now - start + history)) / samplePeriod),
    { lo: 0 }
  );
  const right = bisector.right(buffer, end, leftBound);
  const left = bisector.left(buffer, start - history, leftBound, right);
  const padRight =
    clamp(right + pad, {
      hi: buffer.length,
    }) - right;
  const padLeft =
    left -
    clamp(left - pad, {
      lo: 0,
    });

  scaleX.domain([start, end]);

  // Get current view of buffer
  const view = buffer
    .slice(left - padLeft, right + padRight)
    .filter(
      (_, i, a) => i < padLeft || i >= a.length - padRight || i % stride == 0
    );

  // console.log('timespan:', timespan);
  // console.log('stride:', stride);
  // console.log('left:', left);
  // console.log('right:', right);
  // console.log('start - pad:', start - pad);

  // Set y-axis scaling for view
  const extent = d3.extent(view.slice(), d => d[1]) as Pair;
  const [lo] = useMemoSpring(extent[0], { tension: 60, friction: 10 });
  const [hi] = useMemoSpring(extent[1], { tension: 60, friction: 10 });
  scaleY.domain([lo, hi] as Pair);

  return view.map(([x, y]): Pair => [scaleX(x), scaleY(y)]);
}
