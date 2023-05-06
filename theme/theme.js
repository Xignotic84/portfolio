import { mode } from "@chakra-ui/theme-tools";


export const theme = {
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: true,
  },
  styles: {
    global: (props) => ({
      body: {
        background: mode("white", "#030303")(props),
        color: mode("black", 'white')(props),
      },
    })
  },
  fonts: {
    heading: `'Rajdhani', sans-serif`,
    body: `'Rajdhani', sans-serif`
  },
  colors: {
    background: {
      primary: '#030303',
      secondary: '#191919'
    },

  }
}
