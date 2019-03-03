import { required } from 'utils/DefaultProps';
import Denque from 'denque';
import { Pair } from 'utils/Pair';
import { RelativeCoordinates } from 'utils/canvas/EnhancedContext';
import { useEffect } from 'react';
import { deriveCoordinates } from 'utils/coordinates';
import { useView } from './useView';
import { REF } from 'utils/easier';

const Args = required<{
  buffer: Denque<Pair>;
  scaleX: d3.ScaleLinear<number, number>;
  scaleY: d3.ScaleLinear<number, number>;
  timespan: REF<number>;
  dims: REF<DOMRect>;
  padDomain: number;
  padRange: RelativeCoordinates;
}>();

export const useLine = Args.wrap(
  ({ timespan, dims, padDomain, padRange, ...init }) => {
    useEffect(() => {
      const { x: padX, y: padY } = deriveCoordinates.call(
        dims.current,
        padRange
      );
      init.scaleX.domain([-timespan.current - padDomain, -padDomain]);
      init.scaleX.range([padX, dims.current.width - padX]);
      init.scaleY.range([padY, dims.current.height - padY]);
    });

    const [view, update, currentScaleX] = useView(init);
    return Object.assign({ view, update, currentScaleX }, init);
  }
);
