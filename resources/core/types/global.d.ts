import _ from 'lodash'

declare global {
  // @ts-expect-error
  export import $lodash = _
  // promise function
  export function asyncGetUtilOutput<T>(output: $util.Output<T>): Promise<T>
}
