/// <reference path="./global.d.ts" />
import _ from 'lodash'
global.$lodash = _

global.asyncGetUtilOutput = async <T>(output: $util.Output<T>): Promise<T> => {
  return new Promise((resolve, reject) => {
    output.apply((value) => {
      resolve(value)
    })
  })
}
