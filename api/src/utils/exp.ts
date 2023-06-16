import { ExperienceLevel } from '~/const/exp'

export function determineExpLevel(exp: number) {
  const levelIndex = ExperienceLevel.findLastIndex((level) => level.exp <= exp)

  if (levelIndex === -1) {
    throw new Error('Invalid exp')
  }

  const level = ExperienceLevel[levelIndex]

  return {
    currentlevel: level.level,
    nextLevel: ExperienceLevel[levelIndex + 1]?.level,
    nextLevelExp: ExperienceLevel[levelIndex + 1]?.exp,
  }
}
