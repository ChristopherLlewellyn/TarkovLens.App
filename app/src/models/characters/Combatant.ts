import BallisticsCalculator from 'src/functions/BallisticsCalculator';
import Utils from 'src/functions/Utils';
import { Armor } from '../items/Armor';
import { DamageSource } from '../items/_shared';
import { BodyPart } from './BodyPart';
import { BodyPartDamageMultiplier } from './BodyPartDamageMultiplier';
import { Character } from './Character';
import { HealthStatus } from './HealthStatus';
import { Hitbox } from './Hitbox';
import { CharacterType, MapLocation } from './_shared';

export class Combatant implements Character {
  public id: string;
  public type: CharacterType;
  public name: string;
  public nickname: string;
  public description: string;
  public portrait: string;
  public location: MapLocation;
  public healthStatus: HealthStatus;
  public equipment: Equipment;
  public alive: boolean;

  constructor(
    id: string,
    type: CharacterType,
    name: string,
    nickname: string,
    description: string,
    portrait: string,
    location: MapLocation,
    healthStatus: HealthStatus,
    equipment: Equipment,
    alive = true) {
    this.id = id
    this.type = type
    this.name = name
    this.nickname = nickname
    this.description = description
    this.portrait = portrait
    this.location = location
    this.healthStatus = healthStatus
    this.equipment = equipment ?? new Equipment()
    this.alive = alive
  }

  public getHit(hitbox: Hitbox, damageSource: DamageSource) {
    const protectiveArmor = this.getHitboxProtection(hitbox);
    if (protectiveArmor !== undefined && protectiveArmor.currentDurability > 0) {
      this.handleHitInArmoredZone(hitbox, protectiveArmor, damageSource);
    }

    else {
      this.takeDamage(hitbox, damageSource.damage)
    }
  }

  private die() {
    this.alive = false;
    this.healthStatus.head.currentHp = 0
    this.healthStatus.thorax.currentHp = 0
    this.healthStatus.stomach.currentHp = 0
    this.healthStatus.leftArm.currentHp = 0
    this.healthStatus.rightArm.currentHp = 0
    this.healthStatus.leftLeg.currentHp = 0
    this.healthStatus.rightLeg.currentHp = 0
  }

  // This method smells
  private takeDamage(hitbox: Hitbox, damage: number) {
    let newHp: number
    switch (hitbox) {
      // HEAD
      case Hitbox.HeadEars:
      case Hitbox.HeadEyes:
      case Hitbox.HeadJaws:
      case Hitbox.HeadNape:
      case Hitbox.HeadTop:
        newHp = this.healthStatus.head.currentHp - damage
        if (newHp <= 0 && this.healthStatus.head.isVital) {
          this.die();
        }
        else if (newHp < 0) {
          const overflowDamage = Math.abs(newHp) * BodyPartDamageMultiplier.Head
          this.healthStatus.head.currentHp = 0
          this.takeOverflowDamage(overflowDamage, hitbox)
        }
        else {
          this.healthStatus.head.currentHp = newHp
        }
        break

      // THORAX
      case Hitbox.Thorax:
        newHp = this.healthStatus.thorax.currentHp - damage
        if (newHp <= 0 && this.healthStatus.thorax.isVital) {
          this.die();
        }
        else if (newHp < 0) {
          const overflowDamage = Math.abs(newHp) * BodyPartDamageMultiplier.Thorax
          this.healthStatus.thorax.currentHp = 0
          this.takeOverflowDamage(overflowDamage, hitbox)
        }
        else {
          this.healthStatus.thorax.currentHp = newHp
        }
        break

      // STOMACH
      case Hitbox.Stomach:
        newHp = this.healthStatus.stomach.currentHp - damage
        if (newHp <= 0 && this.healthStatus.stomach.isVital) {
          this.die();
        }
        else if (newHp < 0) {
          const overflowDamage = Math.abs(newHp) * BodyPartDamageMultiplier.Stomach
          this.healthStatus.stomach.currentHp = 0
          this.takeOverflowDamage(overflowDamage, hitbox)
        }
        else {
          this.healthStatus.stomach.currentHp = newHp
        }
        break

      // RIGHT ARM
      case Hitbox.RightArm:
        newHp = this.healthStatus.rightArm.currentHp - damage
        if (newHp <= 0 && this.healthStatus.rightArm.isVital) {
          this.die();
        }
        else if (newHp < 0) {
          const overflowDamage = Math.abs(newHp) * BodyPartDamageMultiplier.Arm
          this.healthStatus.rightArm.currentHp = 0
          this.takeOverflowDamage(overflowDamage, hitbox)
        }
        else {
          this.healthStatus.rightArm.currentHp = newHp
        }
        break

      // LEFT ARM
      case Hitbox.LeftArm:
        newHp = this.healthStatus.leftArm.currentHp - damage
        if (newHp <= 0 && this.healthStatus.leftArm.isVital) {
          this.die();
        }
        else if (newHp < 0) {
          const overflowDamage = Math.abs(newHp) * BodyPartDamageMultiplier.Arm
          this.healthStatus.leftArm.currentHp = 0
          this.takeOverflowDamage(overflowDamage, hitbox)
        }
        else {
          this.healthStatus.leftArm.currentHp = newHp
        }
        break

      // LEFT LEG
      case Hitbox.LeftLeg:
        newHp = this.healthStatus.leftLeg.currentHp - damage
        if (newHp <= 0 && this.healthStatus.leftLeg.isVital) {
          this.die();
        }
        else if (newHp < 0) {
          const overflowDamage = Math.abs(newHp) * BodyPartDamageMultiplier.Leg
          this.healthStatus.leftLeg.currentHp = 0
          this.takeOverflowDamage(overflowDamage, hitbox)
        }
        else {
          this.healthStatus.leftLeg.currentHp = newHp
        }
        break

      // RIGHT LEG
      case Hitbox.RightLeg:
        newHp = this.healthStatus.rightLeg.currentHp - damage
        if (newHp <= 0 && this.healthStatus.rightLeg.isVital) {
          this.die();
        }
        else if (newHp < 0) {
          const overflowDamage = Math.abs(newHp) * BodyPartDamageMultiplier.Leg
          this.healthStatus.rightLeg.currentHp = 0
          this.takeOverflowDamage(overflowDamage, hitbox)
        }
        else {
          this.healthStatus.rightLeg.currentHp = newHp
        }
        break
    }
  }

  // This method smells too
  private takeOverflowDamage(overflowDamage: number, skip: Hitbox) {
    if (
      this.healthStatus.head.currentHp > 0
      && skip !== Hitbox.HeadTop
      && skip !== Hitbox.HeadNape
      && skip !== Hitbox.HeadJaws
      && skip !== Hitbox.HeadEyes
      && skip !== Hitbox.HeadEars) {
      this.healthStatus.head.currentHp -= this.calculateBodyPartDamageFromOverflow(this.healthStatus.head, overflowDamage)
      if (this.healthStatus.head.isVital && this.healthStatus.head.currentHp <= 0) {
        this.die()
        return;
      }
    }

    if (this.healthStatus.thorax.currentHp > 0 && skip !== Hitbox.Thorax) {
      this.healthStatus.thorax.currentHp -= this.calculateBodyPartDamageFromOverflow(this.healthStatus.thorax, overflowDamage)
      if (this.healthStatus.thorax.isVital && this.healthStatus.thorax.currentHp <= 0) {
        this.die()
        return;
      }
    }

    if (this.healthStatus.rightArm.currentHp > 0 && skip !== Hitbox.RightArm) {
      this.healthStatus.rightArm.currentHp -= this.calculateBodyPartDamageFromOverflow(this.healthStatus.rightArm, overflowDamage)
      if (this.healthStatus.rightArm.isVital && this.healthStatus.rightArm.currentHp <= 0) {
        this.die()
        return;
      }
    }

    if (this.healthStatus.leftArm.currentHp > 0 && skip !== Hitbox.LeftArm) {
      this.healthStatus.leftArm.currentHp -= this.calculateBodyPartDamageFromOverflow(this.healthStatus.leftArm, overflowDamage)
      if (this.healthStatus.leftArm.isVital && this.healthStatus.leftArm.currentHp <= 0) {
        this.die()
        return;
      }
    }

    if (this.healthStatus.stomach.currentHp > 0 && skip !== Hitbox.Stomach) {
      this.healthStatus.stomach.currentHp -= this.calculateBodyPartDamageFromOverflow(this.healthStatus.stomach, overflowDamage)
      if (this.healthStatus.stomach.isVital && this.healthStatus.stomach.currentHp <= 0) {
        this.die()
        return;
      }
    }

    if (this.healthStatus.rightLeg.currentHp > 0 && skip !== Hitbox.RightLeg) {
      this.healthStatus.rightLeg.currentHp -= this.calculateBodyPartDamageFromOverflow(this.healthStatus.rightLeg, overflowDamage)
      if (this.healthStatus.rightLeg.isVital && this.healthStatus.rightLeg.currentHp <= 0) {
        this.die()
        return;
      }
    }

    if (this.healthStatus.leftLeg.currentHp > 0 && skip !== Hitbox.LeftLeg) {
      this.healthStatus.leftLeg.currentHp -= this.calculateBodyPartDamageFromOverflow(this.healthStatus.leftLeg, overflowDamage)
      if (this.healthStatus.leftLeg.isVital && this.healthStatus.leftLeg.currentHp <= 0) {
        this.die()
        return;
      }
    }
  }

  private takeArmorDamage (hitbox: Hitbox, armorDamage: number) {
    const armor = this.getHitboxProtection(hitbox)
    if (armor !== undefined) {
      armor.currentDurability = Math.max(armor.currentDurability - armorDamage, 0)
    }
  }

  private calculateBodyPartDamageFromOverflow(bodyPart: BodyPart, overflowDamage: number) {
    const proportionOfMaxHp = bodyPart.maxHp / this.healthStatus.maxHp
    return overflowDamage * proportionOfMaxHp
  }

  private handleHitInArmoredZone(hitbox: Hitbox, protectiveArmor: EquippedArmor, damageSource: DamageSource) {
    const penetrationChance = BallisticsCalculator.calculatePenetrationChance(
      protectiveArmor.currentDurability,
      protectiveArmor.armor.durability,
      protectiveArmor.armor.class,
      damageSource.penetration);

    // Simulate bullet hitting armor
    const doesPenetrate = Utils.simulateEventGivenPercentageChance(penetrationChance);
    if (doesPenetrate) {
      this.handlePenetrativeHitOnArmor(hitbox, damageSource, protectiveArmor);
    }
    else {
      this.handleNonPenetrativeHitOnArmor(hitbox, damageSource, protectiveArmor);
    }
  }

  private handleNonPenetrativeHitOnArmor(hitbox: Hitbox, damageSource: DamageSource, protectiveArmor: EquippedArmor) {
    const armorDamage = BallisticsCalculator.calculateDamageToArmorWhenDoesNotPenetrate(
      damageSource.penetration,
      damageSource.armorDamage,
      protectiveArmor.armor.class,
      protectiveArmor.armor.material.destructability
    );

    const damageDealt = BallisticsCalculator.calculateDamageToCombatantWhenDoesNotPenetrate(
      damageSource.damage,
      damageSource.penetration,
      protectiveArmor.armor.class,
      protectiveArmor.currentDurability,
      protectiveArmor.armor.durability,
      protectiveArmor.armor.bluntThroughput
    );

    this.takeDamage(hitbox, damageDealt)
    this.takeArmorDamage(hitbox, armorDamage)
  }

  private handlePenetrativeHitOnArmor(hitbox: Hitbox, damageSource: DamageSource, protectiveArmor: EquippedArmor) {
    const armorDamage = BallisticsCalculator.calculateDamageToArmorWhenPenetrates(
      damageSource.penetration,
      damageSource.armorDamage,
      protectiveArmor.armor.class,
      protectiveArmor.armor.material.destructability
    );

    const damageDealt = BallisticsCalculator.calculateDamageToCombatantWhenPenetrates(
      damageSource.damage,
      damageSource.penetration,
      protectiveArmor.armor.class,
      protectiveArmor.currentDurability,
      protectiveArmor.armor.durability
    );

    this.takeDamage(hitbox, damageDealt)
    this.takeArmorDamage(hitbox, armorDamage)
  }

  private getHitboxProtection(hitbox: Hitbox): EquippedArmor | undefined {
    let protectiveArmor: EquippedArmor | undefined
    switch (hitbox) {
      case Hitbox.HeadTop:
      case Hitbox.HeadEyes:
      case Hitbox.HeadEars:
      case Hitbox.HeadJaws:
      case Hitbox.HeadNape:
        protectiveArmor = this.equipment.headwear.find(x => x.armor.zones.find(x => x === hitbox));
        break;

      case Hitbox.Thorax:
      case Hitbox.Stomach:
        protectiveArmor = this.equipment.bodyArmor.armor.zones.includes(hitbox) ? this.equipment.bodyArmor : undefined;
        break;

      default:
        protectiveArmor = undefined;
    }
    return protectiveArmor;
  }
}

export class Equipment {
  headwear: EquippedArmor[]
  bodyArmor: EquippedArmor

  constructor(headwear: EquippedArmor[] = [], bodyArmor: EquippedArmor = new EquippedArmor) {
    this.headwear = headwear
    this.bodyArmor = bodyArmor
  }
}

export class EquippedArmor extends Armor {
  currentDurability: number

  constructor(currentDurability = -1) {
    super()
    this.currentDurability = currentDurability >= 0 ? currentDurability : this.armor.durability
  }
}
