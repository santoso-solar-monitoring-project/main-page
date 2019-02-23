import { useMemo } from 'react';
import { Controller } from 'react-spring/renderprops';
import { useImm } from 'utils/Imm';

// Interpolate between values
export function useMemoSpring(
  data: number,
  config: any = {}
): [number, (v: number) => number] {
  // initialize controller
  const controller = useImm(useMemo)(
    () =>
      new Controller(
        { scale: +data || 0, config },
        { native: false, interpolateTo: true, autoStart: true }
      ),
    [config]
  );

  // update
  controller.update({
    scale: +data || 0,
  });

  // expose (value, update)-pair
  const value = controller.getValues().scale as number;
  const update = useMemo(
    () => (v: number) => controller.update({ scale: v }).scale as number,
    []
  );
  return [value, update];
}
