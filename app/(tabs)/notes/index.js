import { Text, View, StyleSheet, ScrollView, Button } from 'react-native';
import { Link, router, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect, useCallback } from 'react';

export default function NotesScreen() {
    //used to refresh page when button is pressed.
    const [buttonPressed, ifButtonPressed] = useState(false);

    //keys and values of all notes
    const [allNotes, updateAllNotes] = useState([])

    //activates whenever the page is focused, so the notes will update when the user returns to the page
    useFocusEffect(
        useCallback(() => {
            console.log("It's so over.")
            ifButtonPressed(!buttonPressed);
            return () => {
                console.log("We are so back.");
            };
        }, [])
    );

    //creates new note when the new note button is pressed.
    const createNewNote = async () => {
        ifButtonPressed(!buttonPressed);
        try {
            let noteId = Date.now().toString();
            const jsonValue = JSON.stringify({ name: "New Note", content: "This is a new note." });
            await AsyncStorage.setItem(noteId, jsonValue);
            router.navigate(`notes/note?noteId=${noteId}`);
        } catch (e) {
            // saving error
        }
    };

    //deletes note that the button is attatched to
    async function deleteNote(noteId) {
        try {
            await AsyncStorage.removeItem(noteId);
            ifButtonPressed(!buttonPressed);
        } catch (e) {
            // remove error
        }
    }

    //grabs all of the keys and note data when a button is pressed, so when a note is made or deleted
    useEffect(() => {
        async function getAllKeys() {
            let keys = []
            try {
                keys = await AsyncStorage.getAllKeys()
                updateAllNotes(await AsyncStorage.multiGet(keys));
            } catch (e) {
                console.log(e)
            }
        }
        getAllKeys();
    }, [buttonPressed]);


    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.displayNotes}>
                    {allNotes.map((data) => {
                        return (
                            <View style={styles.individualNotes} key={data[0]}>
                                <Link href={`notes/note?noteId=${data[0]}`} style={[styles.individualNotes, styles.text]}>{JSON.parse(data[1]).name}</Link>
                                <Button
                                    onPress={() => { deleteNote(data[0]) }}
                                    title="Delete Note"
                                    color="#841584"
                                    accessibilityLabel="Make a new note."
                                />
                            </View>
                        )
                    })};
                </View>

                {/* <View style={styles.displayNotes}>{noteList}</View> */}
            </ScrollView>
            <View style={styles.newNoteButton}>
                <Button
                    onPress={createNewNote}
                    title="New Note"
                    color="#841584"
                    accessibilityLabel="Make a new note."
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        color: '#424940',
    },
    button: {
        color: '#424940',
        fontSize: 20,
        textDecorationLine: 'underline',
    },
    displayNotes: {
        display: 'flex',

    },
    individualNotes: {
        borderBottomWidth: 2,
        padding: 10,
        borderColor: '#42494080',
        fontSize: 18,
    },
    newNoteButton: {
        display: 'flex',
        position: 'absolute',
        bottom: 0,
        right: 0,
        margin: 10,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'grey',
    }
});
