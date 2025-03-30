export interface FindManyResponse<T> {
  total: number
  [key: string]: T[]
}
