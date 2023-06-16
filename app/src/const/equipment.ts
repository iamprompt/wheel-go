enum EQUIPMENT {
  NONE = 'none',
  MANUAL_WHEELCHAIR = 'manual_wheelchair',
  ELECTRIC_WHEELCHAIR = 'electric_wheelchair',
}

interface Equipment {
  label: string
}

export const Equipments: Record<EQUIPMENT, Equipment> = {
  [EQUIPMENT.NONE]: {
    label: 'equipment.none',
  },
  [EQUIPMENT.MANUAL_WHEELCHAIR]: {
    label: 'equipment.manual_wheelchair',
  },
  [EQUIPMENT.ELECTRIC_WHEELCHAIR]: {
    label: 'equipment.electric_wheelchair',
  },
}
