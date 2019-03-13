import React, { useRef, useEffect, useState } from 'react';
import { _IVPlot } from './_IVPlot';
import { defaults, required } from 'utils/DefaultProps';
import Blur, { Props as BlurProps } from 'components/Blur';
import { useThrottled, useCounter } from 'utils/CustomHooks';
import { optimizedResize } from 'utils/throttleEvent';
import { Omit } from 'utils/meta';

/* interface ModeType {
  style: React.CSSProperties | {};
  current: {
    line: {
      canvasStyle?: CanvasRenderingContext2D | {};
    };
    points: {
      canvasStyle?: CanvasRenderingContext2D | {};
    };
  };
}

export const lightMode: ModeType = {
  style: { backgroundColor: 'transparent' },
  current: {
    line: {
      canvasStyle: { strokeStyle: 'hsl(330, 100%, 75%)' },
      // glow: { blurRadius: 10, color: 'hsl(330, 100%, 50%)' },
    },
    points: {
      canvasStyle: { strokeStyle: 'hsl(330, 100%, 75%)' },
      // glow: { blurRadius: 10, color: 'hsl(330, 100%, 50%)' },
    },
  },
}; */

export const Props = BlurProps.extend(
  required<Omit<typeof _IVPlot.required, 'svgRef'>>(),
  defaults({
    style: {
      position: 'relative',
      width: '100%',
      height: '100%',
      borderRadius: '5px',
      // border: '10px solid blue',
      backgroundColor: '#040404',
    },
  })
);

const IVPlot = Props.wrap(({ channelNames, ...rest }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  // Re-render on resize
  const [, tick] = useCounter();
  useThrottled(
    {
      event: optimizedResize,
      last: tick,
    },
    []
  );

  return (
    <Blur {...rest}>
      <svg ref={svgRef} width='100%' height='100%'>
        <_IVPlot channelNames={channelNames} svgRef={svgRef} />
      </svg>
    </Blur>
  );
});

export default IVPlot;

/* 
// canvasStyle={lightMode.current.line.canvasStyle}
      // glow={lightMode.current.line.glow}
*/
// blur={{ radius: 10 }}
// canvasStyle={lightMode.current.points.canvasStyle}
// glow={lightMode.current.points.glow}
