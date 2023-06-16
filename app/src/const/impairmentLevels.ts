enum IMPAIRMENT_LEVELS {
  INDEPENDENT = 'independent',
  REQUIRE_EQUIPMENT = 'require_equipment',
  REQUIRE_ASSISTANCE = 'require_assistance',
  REQUIRE_EQUIPMENT_AND_ASSISTANCE = 'require_equipment_and_assistance',
  DEPENDENT = 'dependent',
}

interface ImpairmentLevel {
  label: string
}

export const ImpairmentLevels: Record<IMPAIRMENT_LEVELS, ImpairmentLevel> = {
  [IMPAIRMENT_LEVELS.INDEPENDENT]: {
    label: 'impairment_level.independent',
  },
  [IMPAIRMENT_LEVELS.REQUIRE_EQUIPMENT]: {
    label: 'impairment_level.require_equipment',
  },
  [IMPAIRMENT_LEVELS.REQUIRE_ASSISTANCE]: {
    label: 'impairment_level.require_assistance',
  },
  [IMPAIRMENT_LEVELS.REQUIRE_EQUIPMENT_AND_ASSISTANCE]: {
    label: 'impairment_level.require_equipment_and_assistance',
  },
  [IMPAIRMENT_LEVELS.DEPENDENT]: {
    label: 'impairment_level.dependent',
  },
}
