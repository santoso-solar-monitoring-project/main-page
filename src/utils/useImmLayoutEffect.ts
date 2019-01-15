import React, { useLayoutEffect } from 'react';
import Imm, { ImmMapType } from 'utils/Imm';
import useMemoRef from './useMemoRef';

function useImmLayoutEffect(
  effect: React.EffectCallback,
  inputs?: React.InputIdentityList
) {
  const savedInputs = useMemoRef<ImmMapType>(() => Imm.fromJS(inputs).toMap());

  savedInputs.current = savedInputs.current.mergeDeep(
    Imm.fromJS(inputs).toMap()
  );
  useLayoutEffect(effect, [savedInputs.current]);
}

export default useImmLayoutEffect;
