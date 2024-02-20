export const classCombiner = (...classes: unknown[]) => {
  return classes.filter((c) => typeof c === "string").join(" ")
}
