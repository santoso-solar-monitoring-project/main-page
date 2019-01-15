export interface DefaultArgsFunction<T, R = void> {
  (args: T): R;
  defaultArgs?: T;
}
