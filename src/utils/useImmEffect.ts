import React, { useEffect } from 'react';
import Imm, { ImmMapType } from 'utils/Imm';
import useMemoRef from './useMemoRef';

function useImmEffect(
  effect: React.EffectCallback,
  inputs?: React.InputIdentityList
) {
  // This looks like a useful pattern...
  const savedInputs = useMemoRef<ImmMapType>(() => Imm.fromJS(inputs).toMap());

  savedInputs.current = savedInputs.current.mergeDeep(
    Imm.fromJS(inputs).toMap()
  );
  useEffect(effect, [savedInputs.current]);
}

export default useImmEffect;
