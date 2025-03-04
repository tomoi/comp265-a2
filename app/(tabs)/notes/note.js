import { Text, View, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { AsyncStorage } from '@react-native-async-storage/async-storage';


const noteObject = {
    1234: { name: "Note 1", content: "This is my first note, and it might not work." },
    14284: { name: "Note 2", content: "This is my second note, I dont know if it will work." },
    14484: { name: "Note 2", content: "This is my second note, I dont know if it will work." },
    1428464: { name: "Note 2", content: "This is my second note, I dont know if it will work." },
    1424584: { name: "Note 2", content: "This is my second note, I dont know if it will work." },
    1423284: { name: "Note 2", content: "This is my second note, I dont know if it will work." },
    1476284: { name: "Note 2", content: "This is my second note, I dont know if it will work." },
    1421284: { name: "Note 2", content: "This is my second note, I dont know if it will work." },
    14285434: { name: "Note 2", content: "This is my second note, I dont know if it will work." },
    1423284: { name: "Note 2", content: "This is my second note, I dont know if it will work." },
    14345284: { name: "Note 2", content: "This is my second note, I dont know if it will work." },
    1454284: { name: "Note 2", content: "This is my second note, I dont know if it will work." },
    14234284: { name: "Note 2", content: "This is my second note, I dont know if it will work." },
    14463284: { name: "Note 2", content: "This is my second note, I dont know if it will work." },
    1434284: { name: "Note 981", content: "Will this one work?"},
    14223484: { name: "Note 2", content: "This is my second note, I dont know if it will work." },
    1465284: { name: "Note 2", content: "This is my second note, I dont know if it will work." },
    14243284: { name: "Note 2", content: "This is my second note, I dont know if it will work." },
    144643284: { name: "Note 2", content: "This is my second note, I dont know if it will work." },
}

export default function NotesScreen() {
    const { noteId } = useLocalSearchParams();

    useEffect(() => {
        async function getNote(noteID) {
            let keys = []
            try {
                keys = await AsyncStorage.getItem(noteID)
            } catch (e) {
                console.log(e)
            }
            // example console.log result:
            // ['@MyApp_user', '@MyApp_key']
        }
        getNote(noteId);
    }, []);

    const [title, onChangeTitle] = useState("Note Title");
    const [text, onChangeText] = useState("Write Here");

    return (
        <ScrollView style={styles.container}>
            <TextInput
                style={[styles.title, styles.text]}
                onChangeText={onChangeTitle}
                value={title}
            />
            <Text style={[styles.text, styles.date]}>{new Date(Number(noteId)).toString()}</Text>
            <TextInput
                style={styles.text}
                onChangeText={onChangeText}
                value={text}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    text: {
        color: '#424940',
    },
    title: {
        fontWeight: 700,
        fontSize: 28,
        borderBottomWidth: 2,
        borderBottomColor: '#42494050',
        marginBottom: 4,
        paddingBottom: 4,
    },
    date: {
        fontSize: 16,
        color: '#42494075',
        paddingLeft: 20,
    }
});
