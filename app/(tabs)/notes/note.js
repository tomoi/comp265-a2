import { Text, View, StyleSheet, TextInput, ScrollView, Button } from 'react-native';
import { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';


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
    1434284: { name: "Note 981", content: "Will this one work?" },
    14223484: { name: "Note 2", content: "This is my second note, I dont know if it will work." },
    1465284: { name: "Note 2", content: "This is my second note, I dont know if it will work." },
    14243284: { name: "Note 2", content: "This is my second note, I dont know if it will work." },
    144643284: { name: "Note 2", content: "This is my second note, I dont know if it will work." },
}

export default function NotesScreen() {
    const { noteId } = useLocalSearchParams();
    const [noteContent, getNoteContent] = useState("");
    const [title, onChangeTitle] = useState(noteContent.name);
    const [text, onChangeText] = useState(noteContent.content);
    console.log(noteId);

    //function to save note
    async function saveNote() {
        try {
            const jsonValue = JSON.stringify({ name: title, content: text });
            await AsyncStorage.setItem(noteId, jsonValue);
        } catch(e) {
            console.log(e)
        }
        console.log("Done")
    }

    //when the page loads, get page content
    useEffect(() => {
        async function getNote() {
            try {
                let note = await AsyncStorage.getItem(noteId);
                // console.log(note);
                getNoteContent(JSON.parse(note));
            } catch (e) {
                console.log(e)
            }
        }
        getNote();
        console.log(noteContent);
        // console.log(noteContent);
    }, []);

    //when the note loads from storage, fill it to the screen.
    useEffect(() => {
        onChangeTitle(noteContent.name);
        onChangeText(noteContent.content);
    }, [noteContent]);

    return (
        <View style={styles.container}>
            <ScrollView>
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
            <Button
                onPress={saveNote}
                title="Save Note"
                color="#841584"
                accessibilityLabel="Save the current note."
            />
        </View>
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
