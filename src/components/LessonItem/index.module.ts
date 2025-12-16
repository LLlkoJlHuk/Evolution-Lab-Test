import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 16,
		marginHorizontal: 16,
		marginVertical: 8,
		borderRadius: 12,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	doneContainer: {
		backgroundColor: '#F1F8F4',
		borderLeftWidth: 4,
		borderLeftColor: '#4CAF50',
	},
	activeContainer: {
		backgroundColor: '#E3F2FD',
		borderLeftWidth: 4,
		borderLeftColor: '#2196F3',
		transform: [{ scale: 1.02 }],
	},
	lockedContainer: {
		backgroundColor: '#F5F5F5',
		opacity: 0.7,
	},
	iconContainer: {
		marginRight: 16,
	},
	content: {
		flex: 1,
	},
	title: {
		fontSize: 18,
		fontWeight: '600',
		marginBottom: 4,
	},
	doneText: {
		color: '#2E7D32',
	},
	activeText: {
		color: '#1565C0',
	},
	lockedText: {
		color: '#757575',
	},
	subtitle: {
		fontSize: 14,
		color: '#757575',
	},
})

