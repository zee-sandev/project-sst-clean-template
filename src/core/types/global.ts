/// <reference path="./global.d.ts" />
import _ from 'lodash'
import { z } from 'zod'
import * as inversify from 'inversify'
global.$lodash = _
global.$z = z
global.$di = inversify

global.asyncGetUtilOutput = async <T>(output: $util.Output<T>): Promise<T> => {
  return new Promise((resolve, reject) => {
    output.apply((value) => {
      resolve(value)
    })
  })
}

global.asyncAllGetUtilOutput = async <T>(
  outputs: $util.Output<T>[]
): Promise<T[]> => {
  return Promise.all(outputs.map((output) => asyncGetUtilOutput(output)))
}
