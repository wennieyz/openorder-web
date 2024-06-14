import { Typography, TypographyProps } from '@mui/material';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Foundation/Typography', //👈 The title you'll see in the story's sidebar in Storybook
  component: Typography,
  parameters: {
    layout: 'left',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

const defaultProps: Partial<TypographyProps> = {
  color: 'dark-gray',
  children: 'Openorder Marketplace',
}

const H1: Story = {
  args: {
    ...defaultProps,
    variant: 'h1',
  },
  // decorators: [
  //   (Typography) => (
  //     <div style={{ backgroundColor: 'lightgray', padding: '1rem' }}>
  //       <Typography fontWeight='bold'/>
  //       <Typography fontWeight='light'/>
  //     </div>
  //   ),
  // ],
}

const H2: Story = {
  args: { ...defaultProps, variant: 'h2',},
}

const H3: Story = {
  args: { ...defaultProps, variant: 'h3' },
}

const H4: Story = {
  args: { ...defaultProps, variant: 'h4' },
}

const Paragraph: Story = {
  args: { ...defaultProps, variant: 'paragraph' },
}

const Caption: Story = {
  args: { ...defaultProps, variant: 'caption' },
}

export {
  H1,
  H2,
  H3,
  H4,
  Paragraph,
  Caption,
}
