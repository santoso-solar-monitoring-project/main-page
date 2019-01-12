1. IMPORTS (auto-filled by vscode) but need following:
   import React from 'react';
   import Imm from 'immutable';

2. PROPS TYPE. Export these.

3. DEFAULT PROPS (`defaultProps`). Wrap with `Imm.fromJS`. Sorry I don't know of a better way than just to settle for some redundancy with step 2. Type should be step 2 wrapped in `Partial<...>`.

4. FUNCTION TYPE (`React.FunctionComponent` or `React.RefForwardingComponent`). Use `typeof defaultProps`. Declare as variable so type can be attached.

5. STATEFUL VARIABLES. (`useState`, `useRef`, etc.). (Interchangeable with step 6?)

6. UNPACK PROPS. Merge (`.mergeDeep(...)`) passed props with `defaultProps` and destructure. Optionally merge in two steps and use the Immutable object to diff props versus saved props. (See example in GoodCanvas.)

7. CORE LOGIC. (Varies but often `useEffect`, `useLayoutEffect`.)

8. RETURN. Attach forwarded refs if any. Modify children subtree with `propagateProps` if necessary.

9. EPILOGUE. Decorate component with `forwardRef` if needed. Attach `defaultProps.toJS()`. Export component.
