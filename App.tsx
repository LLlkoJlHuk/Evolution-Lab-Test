import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native'
import { styles } from './App.styles'
import { GrowthMap } from './src/components/GrowthMap'

export default function App() {
	return (
		<SafeAreaView style={styles.container}>
			<GrowthMap />
			<StatusBar style='auto' />
		</SafeAreaView>
	)
}
