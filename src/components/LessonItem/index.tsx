import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Lesson } from '../../types/lesson'
import { styles } from './index.module'

interface LessonItemProps {
	lesson: Lesson
	onPress: (lesson: Lesson) => void
}

export const LessonItem: React.FC<LessonItemProps> = ({ lesson, onPress }) => {
	const getStatusIcon = () => {
		switch (lesson.status) {
			case 'done':
				return <Ionicons name='checkmark-circle' size={32} color='#4CAF50' />
			case 'active':
				return <Ionicons name='play-circle' size={32} color='#2196F3' />
			case 'locked':
				return <Ionicons name='lock-closed' size={32} color='#9E9E9E' />
		}
	}

	const getContainerStyle = () => {
		switch (lesson.status) {
			case 'done':
				return [styles.container, styles.doneContainer]
			case 'active':
				return [styles.container, styles.activeContainer]
			case 'locked':
				return [styles.container, styles.lockedContainer]
		}
	}

	const getTextStyle = () => {
		switch (lesson.status) {
			case 'done':
				return [styles.title, styles.doneText]
			case 'active':
				return [styles.title, styles.activeText]
			case 'locked':
				return [styles.title, styles.lockedText]
		}
	}

	return (
		<TouchableOpacity
			style={getContainerStyle()}
			onPress={() => onPress(lesson)}
			activeOpacity={lesson.status === 'locked' ? 1 : 0.7}
		>
			<View style={styles.iconContainer}>{getStatusIcon()}</View>
			<View style={styles.content}>
				<Text style={getTextStyle()}>{lesson.title}</Text>
				{lesson.status === 'done' && (
					<Text style={styles.subtitle}>Пройдено</Text>
				)}
				{lesson.status === 'active' && (
					<Text style={styles.subtitle}>Нажмите для начала</Text>
				)}
				{lesson.status === 'locked' && (
					<Text style={styles.subtitle}>Недоступно</Text>
				)}
			</View>
		</TouchableOpacity>
	)
}

