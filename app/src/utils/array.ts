// Divide array into chunks
export function chunk<T>(arr: T[], size: number): T[][] {
  return arr.reduce((acc, _, i) => {
    if (i % size === 0) {
      acc.push(arr.slice(i, i + size))
    }
    return acc
  }, [] as T[][])
}
