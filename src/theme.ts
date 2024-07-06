
import { createTheme, PaletteColor, PaletteColorOptions } from '@mui/material'
import { baseColors } from './styleVariables'

declare module '@mui/material/styles' {
  interface Palette {
    purple: SimplePaletteColorOptions
    green: SimplePaletteColorOptions
    red: SimplePaletteColorOptions
    blue: SimplePaletteColorOptions
    yellow: SimplePaletteColorOptions
    gray: SimplePaletteColorOptions
    white: PaletteColor
    black: PaletteColor
  }

  interface PaletteOptions {
    purple?: PaletteColorOptions
    green?: PaletteColorOptions
    red?: PaletteColorOptions
    blue?: PaletteColorOptions
    yellow?: PaletteColorOptions
    gray?: PaletteColorOptions
    white?: PaletteColorOptions
    black?: PaletteColorOptions
  }

  interface SimplePaletteColorOptions {
    100?: string
    90?: string
    80?: string
    70?: string
    60?: string
    50?: string
    40?: string
    30?: string
    20?: string
    10?: string
  }

  interface TypographyVariants {
    paragraph: React.CSSProperties
    caption: React.CSSProperties
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    paragraph?: React.CSSProperties
    caption?: React.CSSProperties
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    paragraph: true
    caption: true
  }
}

declare module '@mui/material/Badge' {
  interface BadgePropsColorOverrides {
    purple: true
    green: true
    red: true
    blue: true
    yellow: true
    white: true
    gray: true
  }
}


const theme = createTheme({
  palette: {
    primary: {
      main: baseColors["--gray-80"],
    },
    secondary: {
      main: baseColors["--gray-60"],
    },
    error: {
      main: baseColors["--red-90"], // TODO: fix this
    },
    white: {
      main: baseColors["--white"],
    },
    black: {
      main: baseColors["--black"],
    },
    purple: {
      100: baseColors["--purple-100"],
      90: baseColors["--purple-90"],
      80: baseColors["--purple-80"],
      70: baseColors["--purple-70"],
      60: baseColors["--purple-60"],
      50: baseColors["--purple-50"],
      40: baseColors["--purple-40"],
      30: baseColors["--purple-30"],
      20: baseColors["--purple-20"],
      10: baseColors["--purple-10"],
    },
    green: {
      100: baseColors["--green-100"],
      90: baseColors["--green-90"],
      80: baseColors["--green-80"],
      70: baseColors["--green-70"],
      60: baseColors["--green-60"],
      50: baseColors["--green-50"],
      40: baseColors["--green-40"],
      30: baseColors["--green-30"],
      20: baseColors["--green-20"],
      10: baseColors["--green-10"],
    },
    red: {
      100: baseColors["--red-100"],
      90: baseColors["--red-90"],
      80: baseColors["--red-80"],
      70: baseColors["--red-70"],
      60: baseColors["--red-60"],
      50: baseColors["--red-50"],
      40: baseColors["--red-40"],
      30: baseColors["--red-30"],
      20: baseColors["--red-20"],
      10: baseColors["--red-10"],
    },
    blue: {
      100: baseColors["--blue-100"],
      90: baseColors["--blue-90"],
      80: baseColors["--blue-80"],
      70: baseColors["--blue-70"],
      60: baseColors["--blue-60"],
      50: baseColors["--blue-50"],
      40: baseColors["--blue-40"],
      30: baseColors["--blue-30"],
      20: baseColors["--blue-20"],
      10: baseColors["--blue-10"],
    },
    yellow: {
      100: baseColors["--yellow-100"],
      90: baseColors["--yellow-90"],
      80: baseColors["--yellow-80"],
      70: baseColors["--yellow-70"],
      60: baseColors["--yellow-60"],
      50: baseColors["--yellow-50"],
      40: baseColors["--yellow-40"],
      30: baseColors["--yellow-30"],
      20: baseColors["--yellow-20"],
      10: baseColors["--yellow-10"],
    },
    gray: {
      100: baseColors["--gray-100"],
      90: baseColors["--gray-90"],
      80: baseColors["--gray-80"],
      70: baseColors["--gray-70"],
      60: baseColors["--gray-60"],
      50: baseColors["--gray-50"],
      40: baseColors["--gray-40"],
      30: baseColors["--gray-30"],
      20: baseColors["--gray-20"],
      10: baseColors["--gray-10"],
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h1: {
      fontSize: "2rem",
      fontWeight: "bold",
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 700,
    },
    h3: {
      fontSize: "1.25rem",
      fontWeight: 700,
    },
    h4: {
      fontSize: "1rem",
      fontWeight: 700,
    },
    paragraph: {
      fontSize: "0.875rem",
      fontWeight: 400,
      fontFamily: "Roboto, sans-serif", // todo: not sure why this needs to be specified here
    },
    caption: {
      fontSize: "0.8125rem",
      fontWeight: 400,
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.color === "light-gray"
            ? {
                color: baseColors["--gray-60"],
              }
            : ownerState.color === "white"
              ? {
                  color: baseColors["--white"],
                }
              : ownerState.color === "blue"
                ? {
                    color: baseColors["--blue-80"],
                  }
                : { color: baseColors["--gray-90"] }),
        }),
      },
      defaultProps: {
        color: "dark-gray",
        variantMapping: {
          paragraph: "p",
          body2: "span",
        },
      },
    },
    MuiBadge: { 
      // TODO: wennie maybe move this to the actual component later?
      // will need to figure out organization
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.color === "purple"
            ? {
                color: theme.palette.purple[90],
                background: theme.palette.purple[10],
              }
            : ownerState.color === "green"
              ? {
                  color: theme.palette.green[90],
                  background: theme.palette.green[10],
                }
              : ownerState.color === "red"
                ? {
                    color: theme.palette.red[90],
                    background: theme.palette.red[10],
                  }
                : ownerState.color === "blue"
                  ? {
                      color: theme.palette.blue[90],
                      background: theme.palette.blue[10],
                    }
                  : ownerState.color === "yellow"
                    ? {
                        color: theme.palette.yellow[90],
                        background: theme.palette.yellow[10],
                      }
                    : ownerState.color === "white"
                      ? {
                          color: theme.palette.gray[80],
                          background: theme.palette.white.main,
                          outline: `1px solid ${theme.palette.gray[30]}`,
                        }
                      : {
                          // default is gray
                          color: theme.palette.gray[80],
                          background: theme.palette.blue[20],
                        }),
          fontFamily: "Roboto, sans-serif",
          textTransform: "uppercase",
          borderRadius: "8px",
          fontWeight: "500",
          fontSize: "12px",
          letterSpacing: "1.44px",
          padding: "9px 16px",
        }),
      },
      defaultProps: {
        color: "gray",
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "contained",
        color: "primary",
      },
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === "contained" &&
          ownerState.color === "primary"
            ? {
                backgroundColor: baseColors["--gray-90"],
                color: baseColors["--white"],
                boxShadow: "none",
                ":hover": {
                  outline: `1px solid ${baseColors["--white"]}`,
                  backgroundColor: baseColors["--gray-80"],
                  boxShadow: "none",
                },
                ":focus": {
                  outline: `2px solid ${baseColors["--white"]}`,
                  backgroundColor: baseColors["--gray-90"],
                  boxShadow: "none",
                },
              }
            : {
                backgroundColor: baseColors["--white"],
                color: baseColors["--gray-80"],
                outline: `1px solid ${baseColors["--blue-30"]}`,
                boxShadow: "none",
                ":hover": {
                  backgroundColor: baseColors["--blue-20"],
                  color: baseColors["--gray-70"],
                  outline: "none",
                  boxShadow: "none",
                },
                ":focus": {
                  outline: `2px solid ${baseColors["--black"]}`,
                  color: baseColors["--gray-70"],
                  backgroundColor: baseColors["--blue-20"],
                  boxShadow: "none",
                },
              }),
          textTransform: "none",
          borderRadius: "30px",
        }),
      },
    },
    MuiChip: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.color === "secondary"
            ? {
                border: `2px solid ${theme.palette.blue[80]}`,
                background: theme.palette.blue[10],
                color: theme.palette.blue[80],
              }
            : {
                border: `1px solid ${theme.palette.blue[30]}`,
                background: theme.palette.blue[10],
                color: theme.palette.gray[70],
              }),
          fontSize: "14px",
          fontWeight: 500,
        }),
      },
    },
    MuiIconButton: {
      defaultProps: {
        color: "primary",
      },
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.color === "primary"
            ? {
                backgroundColor: baseColors["--gray-90"],
                color: baseColors["--white"],
                boxShadow: "none",
                ":hover": {
                  outline: `1px solid ${baseColors["--white"]}`,
                  backgroundColor: baseColors["--gray-80"],
                  boxShadow: "none",
                },
                ":focus": {
                  outline: `2px solid ${baseColors["--white"]}`,
                  backgroundColor: baseColors["--gray-90"],
                  boxShadow: "none",
                },
              }
            : {
                backgroundColor: 'transparent',
                color: baseColors["--gray-80"],
                boxShadow: "none",
                ":hover": {
                  backgroundColor: baseColors["--blue-20"],
                  color: baseColors["--gray-80"],
                  outline: "none",
                  boxShadow: "none",
                },
                ":focus": {
                  outline: `2px solid ${baseColors['--gray-70']}`,
                  color: baseColors["--gray-70"],
                  backgroundColor: baseColors["--blue-20"],
                  boxShadow: "none",
                },
              }),
        }),
      }
    },
    MuiMenuItem: {
      defaultProps: {
        color: "primary",
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: baseColors["--white"],
          borderRadius: "8px",
          boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.20)",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: "100px",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.color === "primary"
            ?  { 
                color: baseColors["--white"],
                stroke: baseColors['--white'],
              } : {
                stroke: baseColors['--gray-70'],
                color: baseColors["--gray-80"],
              }
            ),
          strokeWidth: 1,
        }),
      },
    },
  },
})

export default theme