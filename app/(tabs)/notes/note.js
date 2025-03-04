import { Text, View, StyleSheet, TextInput, ScrollView, Button } from 'react-native';
import { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NotesScreen() {
    const { noteId } = useLocalSearchParams();
    const [noteContent, getNoteContent] = useState("");
    const [title, onChangeTitle] = useState(noteContent.name);
    const [text, onChangeText] = useState(noteContent.content);

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
                getNoteContent(JSON.parse(note));
            } catch (e) {
                console.log(e)
            }
        }
        getNote();
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
