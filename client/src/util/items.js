export const addFont = async (id, url) => {
  let skipInit = false
  // I guess firefox doesn't think that a FontFaceSetIterator isn't an iterator.
  let iter = document.fonts.values()
  let next = null
  while (!(next = iter.next()).done) {
    if (next.value.family === `font-${id}`) skipInit = true
  }
  if (!skipInit) {
    console.log(`Loading font ${url}`)
    const newFont = new FontFace(`font-${id}`, `url(${url})`)
    document.fonts.add(await newFont.load())
  }
}
