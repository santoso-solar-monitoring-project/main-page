## Best Practices for React Functional Components

All React components in this project have the following structure.

1. IMPORTS (auto-filled by vscode) but need following:
   import React from 'react';
   import Imm from 'immutable';

2. PROPS TYPE. Export these.

3. DEFAULT PROPS (`defaultProps`). Define supporting types and wrap with `Imm.fromJS`. This part is a little verbose. See a component for an example. Note: We always extract defaults so that we can easily extend the behavior of the function which relies on these defaults. Export both the supporting types and the actual `defaultProps` object.

4. FUNCTION TYPE (`React.FunctionComponent` or `React.RefForwardingComponent`). Use `typeof defaultProps`. Declare as variable so type can be attached.

5. STATEFUL VARIABLES. (`useState`, `useRef`, etc.). (Interchangeable with step 6?)

6. UNPACK PROPS. Merge (`.mergeDeep(...)`) passed props with `defaultProps` and destructure. Optionally merge in two steps and use the Immutable object to diff props versus saved props. (See example in GoodCanvas.) Beware that diffing in hooks (e.g. sensitivity list of `useEffect`) is reference based for non-trivial properties. For instance, if you are passing an arrow function that hasn't been cached, it will compare different each time i.e. `(()=>{}) !== (()=>{})` and similarly `[] !== []`.
   NEVER DESTRUCTURE TO GET THE CHILDREN PROPERTY. DOING SO WILL DESTROY ANY REFS ATTACHED TO CHILDREN. HARD EARNED LESSON WITH YILUN.
   DON'T DO THIS:
   const {children, ...rest} = defaultProps.mergeDeep(props);
   DO THIS:
   const {...rest} = defaultProps.mergeDeep(props);
   const children = props.children;
   Also don't rely on the `children` contained in the `rest` in the "DO THIS" example. That would be committing the very same mistake as the "DON'T DO THIS" example.
   Using refs and Immutable.Map.mergeDeep is in general dangerous.

7. CORE LOGIC. (Varies but often `useEffect`, `useLayoutEffect`.)

8. RETURN. Attach forwarded refs if any. Modify children subtree with `propagateProps` if necessary.

9. EPILOGUE. Decorate component with `forwardRef` if needed. Attach `defaultProps.toJS()`. Export component.
