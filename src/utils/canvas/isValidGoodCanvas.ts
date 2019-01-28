import { GoodCanvasElement } from 'components/GoodCanvas';
import isValidRefObject from 'utils/isValidRefObject';

export function isValidGoodCanvas(
  canvasRef: React.Ref<typeof GoodCanvasElement.propsOut>
): canvasRef is React.RefObject<typeof GoodCanvasElement.propsOut> {
  if (
    !isValidRefObject(canvasRef, {
      REF_NULL: '`canvasRef` should not be `null`',
      NO_CURRENT:
        'Use a React.RefObject not a functional ref. (`current` member not found in `canvasRef`.)',
    })
  ) {
    // Not reached
    throw Error();
  }
  if (canvasRef.current == null) {
    throw Error('`canvasRef.current` should not be `null`');
  }
  return true;
}
