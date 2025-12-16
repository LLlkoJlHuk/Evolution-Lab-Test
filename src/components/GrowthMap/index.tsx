import React from 'react'
import { Alert, FlatList, Text, View } from 'react-native'
import { lessonsData } from '../../data/lessons'
import { Lesson } from '../../types/lesson'
import { LessonItem } from '../LessonItem'
import { styles } from './index.module'

export const GrowthMap: React.FC = () => {
	const handleLessonPress = (lesson: Lesson) => {
		switch (lesson.status) {
			case 'active':
				console.log('Start lesson')
				break
			case 'locked':
				Alert.alert(
					'Урок недоступен',
					'Этот урок заблокирован. Завершите предыдущие уроки, чтобы его разблокировать.',
					[{ text: 'OK' }]
				)
				break
			case 'done':
				console.log('Lesson already completed')
				break
		}
	}

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Карта развития</Text>
			<FlatList
				data={lessonsData}
				keyExtractor={item => item.id.toString()}
				renderItem={({ item }) => (
					<LessonItem lesson={item} onPress={handleLessonPress} />
				)}
				contentContainerStyle={styles.listContent}
			/>
		</View>
	)
}

