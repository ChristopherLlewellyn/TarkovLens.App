export enum Hitbox {
  HeadTop = 'top',
  HeadNape = 'nape',
  HeadEars = 'ears',
  HeadEyes = 'eyes',
  HeadJaws = 'jaws',
  Thorax = 'chest',
  RightArm = 'rightarm',
  LeftArm = 'leftarm',
  Stomach = 'stomach',
  RightLeg = 'rightleg',
  LeftLeg = 'leftleg'
}

export function hitboxToReadable(hitbox: Hitbox) {
  switch (hitbox) {
    case Hitbox.HeadEars:
      return 'Head, Ears'

    case Hitbox.HeadEyes:
      return 'Head, Eyes'

    case Hitbox.HeadJaws:
      return 'Head, Jaws'

    case Hitbox.HeadNape:
      return 'Head, Nape'

    case Hitbox.HeadTop:
      return 'Head, Top'

    case Hitbox.LeftArm:
      return 'Left Arm'

    case Hitbox.RightArm:
      return 'Right Arm'

    case Hitbox.LeftLeg:
      return 'Left Leg'

    case Hitbox.RightLeg:
      return 'Right Leg'

    case Hitbox.Stomach:
      return 'Stomach'

    case Hitbox.Thorax:
      return 'Thorax'

    default:
      return 'Unknown'
  }
}