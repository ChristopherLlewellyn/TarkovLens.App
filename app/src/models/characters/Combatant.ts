import BallisticsCalculator from 'src/functions/BallisticsCalculator';
import Utils from 'src/functions/Utils';
import { Armor } from '../items/Armor';
import { DamageSource } from '../items/_shared';
import { BodyPart } from './BodyPart';
import { BodyPartDamageMultiplier } from './BodyPartDamageMultiplier';
import { Character } from './Character';
import { HealthStatus } from './HealthStatus';
import { Hitbox, hitboxToReadable } from './Hitbox';
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
  public alive = true;
  public eventLogs: CombatantDamageEvent[] = [];

  constructor(
    id = '',
    type: CharacterType = CharacterType.PMC,
    name = '',
    nickname = '',
    description = '',
    portrait = '',
    location = MapLocation.All,
    healthStatus = new HealthStatus(),
    equipment = new Equipment(),
    alive = false) {
    this.id = id
    this.type = type
    this.name = name
    this.nickname = nickname
    this.description = description
    this.portrait = portrait
    this.location = location
    this.healthStatus = new HealthStatus(
      healthStatus.maxHp,
      healthStatus.head,
      healthStatus.thorax,
      healthStatus.stomach,
      healthStatus.leftArm,
      healthStatus.rightArm,
      healthStatus.leftLeg,
      healthStatus.rightLeg
    )
    this.equipment = equipment
    this.alive = alive
  }

  public getHit(hitbox: Hitbox, damageSource: DamageSource) {
    if (damageSource.id.length === 0) {
      return
    }
    if (!this.alive) {
      return
    }

    const damageEventLog = new CombatantDamageEvent(hitbox, damageSource.shortName)

    const protectiveArmor = this.getHitboxProtection(hitbox);
    if (protectiveArmor !== undefined && protectiveArmor.currentDurability > 0) {
      this.handleHitInArmoredZone(hitbox, protectiveArmor, damageSource, damageEventLog);
    }

    else {
      damageEventLog.penetrated = true
      this.takeDamage(hitbox, damageSource.damage * damageSource.projectiles, damageEventLog)
    }

    damageEventLog.remainingHp = this.healthStatus.currentHp
    this.eventLogs.push(damageEventLog)
  }

  public reset() {
    this.healthStatus.head.currentHp = this.healthStatus.head.maxHp
    this.healthStatus.thorax.currentHp = this.healthStatus.thorax.maxHp
    this.healthStatus.stomach.currentHp = this.healthStatus.stomach.maxHp
    this.healthStatus.leftArm.currentHp = this.healthStatus.leftArm.maxHp
    this.healthStatus.rightArm.currentHp = this.healthStatus.rightArm.maxHp
    this.healthStatus.leftLeg.currentHp = this.healthStatus.leftLeg.maxHp
    this.healthStatus.rightLeg.currentHp = this.healthStatus.rightLeg.maxHp
    this.alive = true

    this.equipment.bodyArmor.currentDurability = this.equipment.bodyArmor.armor.durability

    this.eventLogs = []
  }

  private die(damageEventLog: CombatantDamageEvent) {
    this.alive = false;
    this.healthStatus.head.currentHp = 0
    this.healthStatus.thorax.currentHp = 0
    this.healthStatus.stomach.currentHp = 0
    this.healthStatus.leftArm.currentHp = 0
    this.healthStatus.rightArm.currentHp = 0
    this.healthStatus.leftLeg.currentHp = 0
    this.healthStatus.rightLeg.currentHp = 0

    damageEventLog.killShot = true
  }

  // This method smells
  private takeDamage(hitbox: Hitbox, damage: number, damageEventLog: CombatantDamageEvent) {
    let oldHp = 0
    let newHp = 0
    let overflowDamage = 0
    switch (hitbox) {
      // HEAD
      case Hitbox.HeadEars:
      case Hitbox.HeadEyes:
      case Hitbox.HeadJaws:
      case Hitbox.HeadNape:
      case Hitbox.HeadTop:
        oldHp = this.healthStatus.head.currentHp
        newHp = this.healthStatus.head.currentHp - damage
        if (newHp <= 0 && this.healthStatus.head.isVital) {
          damageEventLog.damageLogs.push(`Head took ${(damage).toFixed(1)} damage (0 rem.)`)
          this.die(damageEventLog);
        }
        else if (newHp < 0) {
          overflowDamage = Math.abs(newHp) * BodyPartDamageMultiplier.Head
          damageEventLog.damageLogs.push(`Head took ${(oldHp).toFixed(1)} damage (0 rem.) and passed on ${overflowDamage.toFixed(1)} overflow damage`)
          this.healthStatus.head.currentHp = 0
          this.takeOverflowDamage(overflowDamage, hitbox, damageEventLog)
        }
        else {
          this.healthStatus.head.currentHp = newHp
          damageEventLog.damageLogs.push(`Head took ${damage.toFixed(1)} damage (${this.healthStatus.head.currentHp.toFixed(1)} rem.)`)
        }
        break

      // THORAX
      case Hitbox.Thorax:
        oldHp = this.healthStatus.thorax.currentHp
        newHp = this.healthStatus.thorax.currentHp - damage
        if (newHp <= 0 && this.healthStatus.thorax.isVital) {
          damageEventLog.damageLogs.push(`Thorax took ${(damage).toFixed(1)} damage (0 rem.)`)
          this.die(damageEventLog);
        }
        else if (newHp < 0) {
          overflowDamage = Math.abs(newHp) * BodyPartDamageMultiplier.Thorax
          damageEventLog.damageLogs.push(`Thorax took ${(oldHp).toFixed(1)} damage (0 rem.) and passed on ${overflowDamage.toFixed(1)} overflow damage`)
          this.healthStatus.thorax.currentHp = 0
          this.takeOverflowDamage(overflowDamage, hitbox, damageEventLog)
        }
        else {
          this.healthStatus.thorax.currentHp = newHp
          damageEventLog.damageLogs.push(`Thorax took ${(damage).toFixed(1)} damage (${this.healthStatus.thorax.currentHp.toFixed(1)} rem.)`)
        }
        break

      // STOMACH
      case Hitbox.Stomach:
        oldHp = this.healthStatus.stomach.currentHp
        newHp = this.healthStatus.stomach.currentHp - damage
        if (newHp <= 0 && this.healthStatus.stomach.isVital) {
          damageEventLog.damageLogs.push(`Stomach took ${(damage).toFixed(1)} damage (0 rem.)`)
          this.die(damageEventLog);
        }
        else if (newHp < 0) {
          overflowDamage = Math.abs(newHp) * BodyPartDamageMultiplier.Stomach
          damageEventLog.damageLogs.push(`Stomach took ${(oldHp).toFixed(1)} damage (0 rem.) and passed on ${overflowDamage.toFixed(1)} overflow damage`)
          this.healthStatus.stomach.currentHp = 0
          this.takeOverflowDamage(overflowDamage, hitbox, damageEventLog)
        }
        else {
          this.healthStatus.stomach.currentHp = newHp
          damageEventLog.damageLogs.push(`Stomach took ${(damage).toFixed(1)} damage (${this.healthStatus.stomach.currentHp.toFixed(1)} rem.)`)
        }
        break

      // RIGHT ARM
      case Hitbox.RightArm:
        oldHp = this.healthStatus.rightArm.currentHp
        newHp = this.healthStatus.rightArm.currentHp - damage
        if (newHp <= 0 && this.healthStatus.rightArm.isVital) {
          damageEventLog.damageLogs.push(`Right Arm took ${(damage).toFixed(1)} damage (0 rem.)`)
          this.die(damageEventLog);
        }
        else if (newHp < 0) {
          overflowDamage = Math.abs(newHp) * BodyPartDamageMultiplier.Arm
          damageEventLog.damageLogs.push(`Right Arm took ${(damage).toFixed(1)} damage (0 rem.) and passed on ${overflowDamage.toFixed(1)} overflow damage`)
          this.healthStatus.rightArm.currentHp = 0
          this.takeOverflowDamage(overflowDamage, hitbox, damageEventLog)
        }
        else {
          this.healthStatus.rightArm.currentHp = newHp
          damageEventLog.damageLogs.push(`Right Arm took ${(damage).toFixed(1)} damage (${this.healthStatus.rightArm.currentHp.toFixed(1)} rem.)`)
        }
        break

      // LEFT ARM
      case Hitbox.LeftArm:
        oldHp = this.healthStatus.leftArm.currentHp
        newHp = this.healthStatus.leftArm.currentHp - damage
        if (newHp <= 0 && this.healthStatus.leftArm.isVital) {
          damageEventLog.damageLogs.push(`Left Arm took ${(damage).toFixed(1)} damage (0 rem.)`)
          this.die(damageEventLog);
        }
        else if (newHp < 0) {
          overflowDamage = Math.abs(newHp) * BodyPartDamageMultiplier.Arm
          damageEventLog.damageLogs.push(`Left Arm took ${(oldHp).toFixed(1)} damage (0 rem.) and passed on ${overflowDamage.toFixed(1)} overflow damage`)
          this.healthStatus.leftArm.currentHp = 0
          this.takeOverflowDamage(overflowDamage, hitbox, damageEventLog)
        }
        else {
          this.healthStatus.leftArm.currentHp = newHp
          damageEventLog.damageLogs.push(`Left Arm took ${(damage).toFixed(1)} damage (${this.healthStatus.leftArm.currentHp.toFixed(1)} rem.)`)
        }
        break

      // LEFT LEG
      case Hitbox.LeftLeg:
        oldHp = this.healthStatus.leftLeg.currentHp
        newHp = this.healthStatus.leftLeg.currentHp - damage
        if (newHp <= 0 && this.healthStatus.leftLeg.isVital) {
          damageEventLog.damageLogs.push(`Left Leg took ${(damage).toFixed(1)} damage (0 rem.)`)
          this.die(damageEventLog);
        }
        else if (newHp < 0) {
          overflowDamage = Math.abs(newHp) * BodyPartDamageMultiplier.Leg
          damageEventLog.damageLogs.push(`Left Leg took ${(oldHp).toFixed(1)} damage (0 rem.) and passed on ${overflowDamage.toFixed(1)} overflow damage`)
          this.healthStatus.leftLeg.currentHp = 0
          this.takeOverflowDamage(overflowDamage, hitbox, damageEventLog)
        }
        else {
          this.healthStatus.leftLeg.currentHp = newHp
          damageEventLog.damageLogs.push(`Left Leg took ${(damage).toFixed(1)} damage (${this.healthStatus.leftLeg.currentHp.toFixed(1)} rem.)`)
        }
        break

      // RIGHT LEG
      case Hitbox.RightLeg:
        oldHp = this.healthStatus.rightLeg.currentHp
        newHp = this.healthStatus.rightLeg.currentHp - damage
        if (newHp <= 0 && this.healthStatus.rightLeg.isVital) {
          damageEventLog.damageLogs.push(`Right Leg took ${(damage).toFixed(1)} damage (0 rem.)`)
          this.die(damageEventLog);
        }
        else if (newHp < 0) {
          overflowDamage = Math.abs(newHp) * BodyPartDamageMultiplier.Leg
          damageEventLog.damageLogs.push(`Right Leg took ${(oldHp).toFixed(1)} damage (0 rem.) and passed on ${overflowDamage.toFixed(1)} overflow damage`)
          this.healthStatus.rightLeg.currentHp = 0
          this.takeOverflowDamage(overflowDamage, hitbox, damageEventLog)
        }
        else {
          this.healthStatus.rightLeg.currentHp = newHp
          damageEventLog.damageLogs.push(`Right Leg took ${(damage).toFixed(1)} damage (${this.healthStatus.rightLeg.currentHp.toFixed(1)} rem.)`)
        }
        break

      default: //nothing
    }
  }

  // This method smells too
  private takeOverflowDamage(overflowDamage: number, skip: Hitbox, damageEventLog: CombatantDamageEvent) {
    if (
      this.healthStatus.head.currentHp > 0
      && skip !== Hitbox.HeadTop
      && skip !== Hitbox.HeadNape
      && skip !== Hitbox.HeadJaws
      && skip !== Hitbox.HeadEyes
      && skip !== Hitbox.HeadEars) {
      const damage = this.calculateBodyPartDamageFromOverflow(this.healthStatus.head, overflowDamage)
      this.healthStatus.head.currentHp -= damage
      this.healthStatus.head.currentHp = Math.max(this.healthStatus.head.currentHp, 0)

      if (damage > 0) {
        damageEventLog.damageLogs.push(`Head took ${damage.toFixed(1)} overflow damage (${this.healthStatus.head.currentHp.toFixed(1)} rem.)`)
      }

      if (this.healthStatus.head.isVital && this.healthStatus.head.currentHp <= 0) {
        this.die(damageEventLog)
        return;
      }
    }

    if (this.healthStatus.thorax.currentHp > 0 && skip !== Hitbox.Thorax) {
      const damage = this.calculateBodyPartDamageFromOverflow(this.healthStatus.thorax, overflowDamage)
      this.healthStatus.thorax.currentHp -= damage
      this.healthStatus.thorax.currentHp = Math.max(this.healthStatus.thorax.currentHp, 0)

      if (damage > 0) {
        damageEventLog.damageLogs.push(`Thorax took ${damage.toFixed(1)} overflow damage (${this.healthStatus.thorax.currentHp.toFixed(1)} rem.)`)
      }

      if (this.healthStatus.thorax.isVital && this.healthStatus.thorax.currentHp <= 0) {
        this.die(damageEventLog)
        return;
      }
    }

    if (this.healthStatus.rightArm.currentHp > 0 && skip !== Hitbox.RightArm) {
      const damage = this.calculateBodyPartDamageFromOverflow(this.healthStatus.rightArm, overflowDamage)
      this.healthStatus.rightArm.currentHp -= damage
      this.healthStatus.rightArm.currentHp = Math.max(this.healthStatus.rightArm.currentHp, 0)

      if (damage > 0) {
        damageEventLog.damageLogs.push(`Right Arm took ${damage.toFixed(1)} overflow damage (${this.healthStatus.rightArm.currentHp.toFixed(1)} rem.)`)
      }

      if (this.healthStatus.rightArm.isVital && this.healthStatus.rightArm.currentHp <= 0) {
        this.die(damageEventLog)
        return;
      }
    }

    if (this.healthStatus.leftArm.currentHp > 0 && skip !== Hitbox.LeftArm) {
      const damage = this.calculateBodyPartDamageFromOverflow(this.healthStatus.leftArm, overflowDamage)
      this.healthStatus.leftArm.currentHp -= damage
      this.healthStatus.leftArm.currentHp = Math.max(this.healthStatus.leftArm.currentHp, 0)

      if (damage > 0) {
        damageEventLog.damageLogs.push(`Left Arm took ${damage.toFixed(1)} overflow damage (${this.healthStatus.leftArm.currentHp.toFixed(1)} rem.)`)
      }

      if (this.healthStatus.leftArm.isVital && this.healthStatus.leftArm.currentHp <= 0) {
        this.die(damageEventLog)
        return;
      }
    }

    if (this.healthStatus.stomach.currentHp > 0 && skip !== Hitbox.Stomach) {
      const damage = this.calculateBodyPartDamageFromOverflow(this.healthStatus.stomach, overflowDamage)
      this.healthStatus.stomach.currentHp -= damage
      this.healthStatus.stomach.currentHp = Math.max(this.healthStatus.stomach.currentHp, 0)

      if (damage > 0) {
        damageEventLog.damageLogs.push(`Stomach took ${damage.toFixed(1)} overflow damage (${this.healthStatus.stomach.currentHp.toFixed(1)} rem.)`)
      }

      if (this.healthStatus.stomach.isVital && this.healthStatus.stomach.currentHp <= 0) {
        this.die(damageEventLog)
        return;
      }
    }

    if (this.healthStatus.rightLeg.currentHp > 0 && skip !== Hitbox.RightLeg) {
      const damage = this.calculateBodyPartDamageFromOverflow(this.healthStatus.rightLeg, overflowDamage)
      this.healthStatus.rightLeg.currentHp -= damage
      this.healthStatus.rightLeg.currentHp = Math.max(this.healthStatus.rightLeg.currentHp, 0)

      if (damage > 0) {
        damageEventLog.damageLogs.push(`Right Leg took ${damage.toFixed(1)} overflow damage (${this.healthStatus.rightLeg.currentHp.toFixed(1)} rem.)`)
      }

      if (this.healthStatus.rightLeg.isVital && this.healthStatus.rightLeg.currentHp <= 0) {
        this.die(damageEventLog)
        return;
      }
    }

    if (this.healthStatus.leftLeg.currentHp > 0 && skip !== Hitbox.LeftLeg) {
      const damage = this.calculateBodyPartDamageFromOverflow(this.healthStatus.leftLeg, overflowDamage)
      this.healthStatus.leftLeg.currentHp -= damage
      this.healthStatus.leftLeg.currentHp = Math.max(this.healthStatus.leftLeg.currentHp, 0)

      if (damage > 0) {
        damageEventLog.damageLogs.push(`Left Leg took ${damage.toFixed(1)} overflow damage (${this.healthStatus.leftLeg.currentHp.toFixed(1)} rem.)`)
      }

      if (this.healthStatus.leftLeg.isVital && this.healthStatus.leftLeg.currentHp <= 0) {
        this.die(damageEventLog)
        return;
      }
    }
  }

  private takeArmorDamage(hitbox: Hitbox, armorDamage: number, damageEventLog: CombatantDamageEvent) {
    const armor = this.getHitboxProtection(hitbox)
    if (armor !== undefined) {
      armor.currentDurability = Math.max(armor.currentDurability - armorDamage, 0)
      damageEventLog.damageLogs.push(`Armor took ${armorDamage.toFixed(1)} damage (${armor.currentDurability.toFixed(1)} rem.)`)
    }
  }

  private calculateBodyPartDamageFromOverflow(bodyPart: BodyPart, overflowDamage: number) {
    const proportionOfMaxHp = bodyPart.maxHp / this.healthStatus.maxHp
    return overflowDamage * proportionOfMaxHp
  }

  private handleHitInArmoredZone(
    hitbox: Hitbox,
    protectiveArmor: EquippedArmor,
    damageSource: DamageSource,
    damageEventLog: CombatantDamageEvent
  ) {
    const penetrationChance = BallisticsCalculator.calculatePenetrationChance(
      protectiveArmor.currentDurability,
      protectiveArmor.armor.durability,
      protectiveArmor.armor.class,
      damageSource.penetration);

    damageEventLog.chanceToPenetrate = penetrationChance

    // Simulate bullet hitting armor
    const doesPenetrate = Utils.simulateEventGivenPercentageChance(penetrationChance);
    if (doesPenetrate) {
      damageEventLog.penetrated = true
      this.handlePenetrativeHitOnArmor(hitbox, damageSource, protectiveArmor, damageEventLog);
    }
    else {
      damageEventLog.penetrated = false
      this.handleNonPenetrativeHitOnArmor(hitbox, damageSource, protectiveArmor, damageEventLog);
    }
  }

  private handleNonPenetrativeHitOnArmor(hitbox: Hitbox, damageSource: DamageSource, protectiveArmor: EquippedArmor, damageEventLog: CombatantDamageEvent) {
    const armorDamage = BallisticsCalculator.calculateDamageToArmorWhenDoesNotPenetrate(
      damageSource.penetration,
      damageSource.projectiles,
      damageSource.armorDamage,
      protectiveArmor.armor.class,
      protectiveArmor.armor.material.destructibility
    );

    const damageDealt = BallisticsCalculator.calculateDamageToCombatantWhenDoesNotPenetrate(
      damageSource.damage,
      damageSource.penetration,
      damageSource.projectiles,
      protectiveArmor.armor.class,
      protectiveArmor.currentDurability,
      protectiveArmor.armor.durability,
      protectiveArmor.armor.bluntThroughput
    );

    this.takeDamage(hitbox, damageDealt, damageEventLog)
    this.takeArmorDamage(hitbox, armorDamage, damageEventLog)
  }

  private handlePenetrativeHitOnArmor(hitbox: Hitbox, damageSource: DamageSource, protectiveArmor: EquippedArmor, damageEventLog: CombatantDamageEvent) {
    const armorDamage = BallisticsCalculator.calculateDamageToArmorWhenPenetrates(
      damageSource.penetration,
      damageSource.projectiles,
      damageSource.armorDamage,
      protectiveArmor.armor.class,
      protectiveArmor.armor.material.destructibility
    );

    const damageDealt = BallisticsCalculator.calculateDamageToCombatantWhenPenetrates(
      damageSource.damage,
      damageSource.penetration,
      damageSource.projectiles,
      protectiveArmor.armor.class,
      protectiveArmor.currentDurability,
      protectiveArmor.armor.durability
    );

    this.takeDamage(hitbox, damageDealt, damageEventLog)
    this.takeArmorDamage(hitbox, armorDamage, damageEventLog)
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
      case Hitbox.LeftArm:
      case Hitbox.RightArm:
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

  constructor(headwear: EquippedArmor[] = [], bodyArmor: EquippedArmor = new EquippedArmor()) {
    this.headwear = headwear
    this.bodyArmor = bodyArmor
  }

  public equipBodyArmor(armor: Armor): void {
    this.bodyArmor = new EquippedArmor(armor.armor.durability, armor)
  }
}

export class EquippedArmor extends Armor {
  currentDurability: number

  constructor(currentDurability = -1, armor = new Armor()) {
    super(
      armor.type,
      armor.armor,
      armor.blocking,
      armor.id,
      armor.blightbusterIcon,
      armor._id,
      armor.name,
      armor.shortName,
      armor.description,
      armor._kind,
      armor.weight,
      armor.price,
      armor.maxStack,
      armor.rarity,
      armor.lastLowestMarketPrice,
      armor.avg24hPrice,
      armor.avg7daysPrice,
      armor.updated,
      armor.diff24h,
      armor.diff7days,
      armor.icon,
      armor.wikiLink,
      armor.img,
      armor.imgBig
    )
    this.currentDurability = currentDurability >= 0 ? currentDurability : this.armor.durability
  }
}

export class CombatantDamageEvent {
  hitbox: Hitbox
  readableHitbox: string
  damageSourceName: string
  damageLogs: string[] = []
  chanceToPenetrate = 100
  penetrated = true
  killShot = false
  remainingHp = 0

  constructor(hitbox: Hitbox, damageSourceName: string) {
    this.hitbox = hitbox
    this.readableHitbox = hitboxToReadable(hitbox)
    this.damageSourceName = damageSourceName
  }
}
