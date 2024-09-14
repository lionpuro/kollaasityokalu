const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)

export default function getMultiplier(width: number) {
  if (!isIOS) {
    return 6000 / width
  } else {
    return 4096 / width
  }
}
