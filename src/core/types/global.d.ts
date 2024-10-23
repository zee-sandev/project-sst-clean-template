import _ from 'lodash'
import { z } from 'zod'
import * as inversify from 'inversify'
declare global {
  // @ts-expect-error
  export import $lodash = _
  export import $z = z
  export import $di = inversify
  // promise function
  export function asyncGetUtilOutput<T>(output: $util.Output<T>): Promise<T>

  export function asyncAllGetUtilOutput<T>(
    outputs: $util.Output<T>[]
  ): Promise<T[]>
}
