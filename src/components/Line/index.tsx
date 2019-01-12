import React, { useEffect } from 'react';
import Imm from 'immutable';
import * as d3 from 'd3';
import { GoodCanvasChildPropsType } from 'components/GoodCanvas';
import { getContext } from 'utils/canvas';
import { PairType } from 'utils/PairType';

export interface LinePropsType extends GoodCanvasChildPropsType {
  data: PairType[];
  line: d3.Line<PairType> | (() => d3.Line<PairType>);
}

const defaultProps: Partial<LinePropsType> = Imm.fromJS({
  data: [],
  // alpha = 0.5 gives centripetal CatmullRom
  line: () => d3.line().curve(d3.curveCatmullRom.alpha(0.5)),
  canvasStyle: {
    lineWidth: 1,
    strokeStyle: 'hsl(330, 100%, 67%)',
  },
});

type LineType = React.FunctionComponent<typeof defaultProps>;

const Line: LineType = (props: typeof defaultProps) => {
  // unpack props
  const {
    data,
    _line,
    canvasRef,
    canvasStyle,
    canvasEffects,
    canvasNeedsUpdate,
  } = defaultProps.mergeDeep(props).toJS();

  console.log('here');
  useEffect(
    () => {
      console.log('Line', data);
      const { ctx } = getContext(canvasRef!);
      const line = typeof _line == 'function' ? _line() : _line;
      // attach context to line
      line.context(ctx);
      ctx.save();
      Object.assign(ctx, canvasStyle);
      if (canvasEffects) canvasEffects(ctx);
      // draw the line
      ctx.beginPath();
      line(data);
      ctx.stroke();
      ctx.restore();
    },
    [canvasNeedsUpdate, data]
  );

  return null;
};

Line.defaultProps = defaultProps.toJS();
export default Line;
