import { createStyles } from '@mantine/core'

export const useStyles = createStyles((theme) => ({
  disabled: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    borderColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[5]
        : theme.colors.gray[2],
    cursor: 'not-allowed',

    '& *': {
      color:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[3]
          : theme.colors.gray[5],
    },
  },
}))
