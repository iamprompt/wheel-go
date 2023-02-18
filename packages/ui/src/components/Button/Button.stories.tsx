import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  argTypes: {
    appearance: {
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'dashed', 'danger'],
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    appearance: 'primary',
  },
}
