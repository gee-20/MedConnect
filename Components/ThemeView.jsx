import { View, useColorScheme} from 'react-native'

import { Color } from '../constants/colors'

const ThemeView = ({style, ...props}) => {
    const colorScheme = useColorScheme()
    const theme = color[colorScheme] ?? color.light


  return (
    <View style={[{
        backgroundColor: theme.background,
    }, style]} {...props}>

    </View>
  )
}

export default ThemeView