export function fromEntries<
  E extends ([K, V])[],
  K extends string | number | symbol = string | number | symbol,
  V = any
>(entries: E) {
  return Object.assign(
    {},
    ...Array.from(entries, ([k, v]) => ({
      [k]: v,
    }))
  );
}

// Test usage
// const aaaa = fromEntries([[1, 10], ['2', 20], ['hello', 'world']]);
