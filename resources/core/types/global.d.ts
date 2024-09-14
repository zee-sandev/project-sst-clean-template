import _ from 'lodash'

declare global {
  // @ts-expect-error
  export import $lodash = _
}
