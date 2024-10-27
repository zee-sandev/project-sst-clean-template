type TKeyOptions = {
  field: string
  composite: string[]
}

type TIndexKeys = {
  pk: TKeyOptions
  sk?: TKeyOptions
  gsi1pk?: TKeyOptions
  gsi1sk?: TKeyOptions
  gsi2pk?: TKeyOptions
  gsi2sk?: TKeyOptions
}

export type { TKeyOptions, TIndexKeys }
