export interface CustomHookType<T, R = void> {
  (args: T, inputs?: React.InputIdentityList): R;
  defaultArgs?: T;
}
