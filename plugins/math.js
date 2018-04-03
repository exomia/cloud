function round(b, c) {
  const a = Math.pow(10, c)
  return Math.round(b * a) / a
}
