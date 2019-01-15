const evaluate = (expr: string, context: any = {}) =>
  Function(...Object.keys(context), `'use strict';return ${expr}`)(
    ...Object.keys(context).map(k => context[k])
  );
export default evaluate;
