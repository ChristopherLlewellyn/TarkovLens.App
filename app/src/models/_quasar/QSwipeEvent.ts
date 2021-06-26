export default interface QSwipeEvent {
  direction: string
  distance: {
    x: number
    y: number
  }
  duration: number
  mouse: boolean
  touch: boolean
  evt: TouchEvent
}