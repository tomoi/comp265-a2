import { Text, View, StyleSheet, ScrollView, } from 'react-native';
import { Link } from 'expo-router';


const noteObject = {
    1234: { name: "Note 1", content: "This is my first note, and it might not work." },
    14284: { name: "Note 2", content: "This is my second note, I dont know if it will work." }
}

export default function NotesScreen() {

    let noteList = [];

    for (let i in noteObject) {
        noteList = [...noteList, <Link key={i} href="notes/note">{noteObject[i].name}</Link>]
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.text}>Notes Home Screen</Text>
            <Link href="notes/note" style={styles.button}>
                Go to Details screen
            </Link>
            <View>{noteList}</View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 15,
    },
    text: {
        color: '#424940',
    },
    button: {
        color: '#424940',
        fontSize: 20,
        textDecorationLine: 'underline',
    }
});
