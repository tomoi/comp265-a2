import { Text, View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function NotesScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Notes Home Screen</Text>
            <Link href="notes/note?data=false" style={styles.button}>
                Go to Details screen
            </Link>
            <Link href="notes/note?data=true" style={styles.button}>
                DON'T CLICK THIS BUTTON
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
    },
    button: {
        color: '#fff',
        fontSize: 20,
        textDecorationLine: 'underline',
    }
});
