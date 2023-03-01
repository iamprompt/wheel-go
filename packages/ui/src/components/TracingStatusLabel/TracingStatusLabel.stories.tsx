import type { Meta, StoryObj } from '@storybook/react'
import { TracingStatusLabel } from './TracingStatusLabel'

const meta: Meta<typeof TracingStatusLabel> = {
  title: 'TracingStatusLabel',
  component: TracingStatusLabel,
  argTypes: {
    color: {
      control: {
        type: 'select',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    color: 'error',
    label: 'Your journey is now recording',
    icon: 'ic:radio-button-checked',
  },
}
