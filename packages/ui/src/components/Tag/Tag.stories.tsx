import type { Meta, StoryObj } from '@storybook/react'
import { Tag } from './Tag'

const meta: Meta<typeof Tag> = {
  title: 'Tag',
  component: Tag,
  argTypes: {
    color: {
      control: {
        type: 'select',
      },
    },
    state: {
      control: {
        type: 'radio',
      },
    },
    compact: {
      control: {
        type: 'boolean',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    color: 'default',
    state: 'available',
    compact: false,
    label: 'Tag',
  },
}
