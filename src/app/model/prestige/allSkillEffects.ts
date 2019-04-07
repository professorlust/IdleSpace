import { SkillEffect } from "./skillEffects";
import { ResourceManager } from "../resource/resourceManager";
import { Bonus } from "../bonus/bonus";

export const PLUS_ADD = 5;
export class AllSkillEffects {
  static effectList = new Array<SkillEffect>();

  //#region Limit increase
  static readonly PLUS_METAL_MINER = new SkillEffect();
  static readonly PLUS_CRYSTAL_MINER = new SkillEffect();
  static readonly PLUS_ENERGY = new SkillEffect();
  static readonly PLUS_ALLOY = new SkillEffect();
  static readonly PLUS_CPU = new SkillEffect();
  static readonly PLUS_WORKER = new SkillEffect();
  static readonly PLUS_SEARCH = new SkillEffect();
  static readonly PLUS_WARRIOR = new SkillEffect();
  static readonly PLUS_BATTERY = new SkillEffect();
  //#endregion
  //#region Combat
  static readonly FAST_COMBAT = new SkillEffect();
  static readonly DOUBLE_NAVAL_CAPACITY = new SkillEffect();
  //#endregion
  //#region Robot Modding
  static readonly FACTORY_BONUS = new SkillEffect();
  static readonly MODDING_PLUS = new SkillEffect();
  //#endregion

  static initialize() {
    const resMan = ResourceManager.getInstance();

    //#region Tier 1
    const tier1 = [
      AllSkillEffects.PLUS_METAL_MINER,
      AllSkillEffects.PLUS_CRYSTAL_MINER,
      AllSkillEffects.PLUS_ALLOY,
      AllSkillEffects.PLUS_ENERGY,
      AllSkillEffects.PLUS_CPU,
      AllSkillEffects.PLUS_WORKER,
      AllSkillEffects.PLUS_SEARCH
    ];
    for (let i = 0; i < 7; i++) {
      tier1[i].shape = resMan.materials[i].shape;
      tier1[i].getDescription = (num = 1) => {
        return (
          "+" +
          PLUS_ADD * num +
          " " +
          resMan.tier1[i].name +
          "\n / " +
          resMan.tier1[i].actions[1].name
        );
      };
    }
    tier1.forEach(e => {
      e.afterBuy = () => {
        ResourceManager.getInstance().limitedResources.forEach(r =>
          r.reloadLimit()
        );
      };
    });
    //#endregion
    //#region PLUS_WARRIOR
    AllSkillEffects.PLUS_WARRIOR.shape = "ship";
    AllSkillEffects.PLUS_WARRIOR.getDescription = (num = 1) => {
      return (
        "+" +
        PLUS_ADD * num +
        " " +
        resMan.warriorX1.name +
        "\n / " +
        resMan.warriorX1.actions[1].name
      );
    };
    AllSkillEffects.PLUS_WARRIOR.afterBuy = () => {
      ResourceManager.getInstance().limitedResources.forEach(r =>
        r.reloadLimit()
      );
    };
    //#endregion
    //#region PLUS_BATTERY
    AllSkillEffects.PLUS_BATTERY.shape = "battery";
    AllSkillEffects.PLUS_BATTERY.getDescription = (num = 1) => {
      return "+ " + 100 * num + "% battery storage";
    };
    AllSkillEffects.PLUS_BATTERY.afterBuy = () => {
      ResourceManager.getInstance().limitedResources.forEach(r =>
        r.reloadLimit()
      );
    };
    //#endregion
    //#region Combat
    AllSkillEffects.FAST_COMBAT.shape = "clock";
    AllSkillEffects.FAST_COMBAT.getDescription = (num = 1) => {
      return "- " + 0.2 * num + "s fight time";
    };
    AllSkillEffects.DOUBLE_NAVAL_CAPACITY.getDescription = (num = 1) => {
      return "+ " + 100 * num + "%\nnaval capacity";
    };
    //#endregion
    //#region Robot Modding
    AllSkillEffects.FACTORY_BONUS.getDescription = (num = 1) => {
      return "+ " + 100 * num + "%\n" + resMan.droneFactory.name + " output";
    };
    ResourceManager.getInstance().droneFactory.productionMultiplier.multiplicativeBonus.push(
      new Bonus(AllSkillEffects.FACTORY_BONUS, 1, true)
    );
    AllSkillEffects.MODDING_PLUS.getDescription = (num = 1) => {
      return "+ " + 5 * num + "\n Modding points";
    };
    //#endregion

    AllSkillEffects.effectList = [
      AllSkillEffects.PLUS_METAL_MINER,
      AllSkillEffects.PLUS_CRYSTAL_MINER,
      AllSkillEffects.PLUS_ALLOY,
      AllSkillEffects.PLUS_ENERGY,
      AllSkillEffects.PLUS_CPU,
      AllSkillEffects.PLUS_WORKER,
      AllSkillEffects.PLUS_SEARCH,
      AllSkillEffects.PLUS_WARRIOR,
      AllSkillEffects.PLUS_BATTERY,
      AllSkillEffects.FAST_COMBAT,
      AllSkillEffects.DOUBLE_NAVAL_CAPACITY,
      AllSkillEffects.FACTORY_BONUS,
      AllSkillEffects.MODDING_PLUS
    ];

    AllSkillEffects.effectList.forEach(e => {
      e.numOwned = 0;
      e.label = e.getDescription(1);
    });
  }
}