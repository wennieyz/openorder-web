import Box from '@mui/material/Box'
import Tab, {TabProps} from '@mui/material/Tab'
import MuiTabs from '@mui/material/Tabs'
import {styled} from '@mui/system'
import * as React from 'react'
import {baseColors} from '../../styleVariables'

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const StyledTab = styled(Tab)<TabProps>(({theme}) => ({
  textTransform: 'none',
  fontWeight: '500',
  '&.MuiTab-root.MuiTab-textColorPrimary:hover': {
    color: theme.palette.gray[90],
  },
  '&.MuiTab-root.MuiTab-textColorPrimary.Mui-selected': {
    color: theme.palette.blue[80],
  },
}))

type TDSTabBarProps = {
  tabs: string[]
  onChange: (event: React.SyntheticEvent, newValue: number) => void
  activeTabIndex?: number
}

const DSTabBar = (props: TDSTabBarProps) => {
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    props.onChange(event, newValue)
  }

  return (
    <Box>
      <MuiTabs
        value={props.activeTabIndex}
        onChange={handleChange}
        TabIndicatorProps={{
          style: {
            backgroundColor: `${baseColors['--blue-80']}`, // TODO: wennie clean this up
          },
        }}
      >
        {props.tabs.map((tab, index) => (
          <StyledTab key={tab} label={tab} {...a11yProps(index)} />
        ))}
      </MuiTabs>
    </Box>
  )
}

export default DSTabBar
