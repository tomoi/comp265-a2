import { Text, View, StyleSheet, ScrollView, Button } from 'react-native';
import { Link, router, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect, useCallback } from 'react';

export default function NotesScreen() {
    //used to refresh page when button is pressed.
    const [buttonPressed, ifButtonPressed] = useState(false);

    //keys and values of all notes
    const [allNotes, updateAllNotes] = useState([])
    const [pageFocused, isPageFocused] = useState(true)


    //activates whenever the page is focused, so the notes will update when the user returns to the page
    useFocusEffect(
        useCallback(() => {
            isPageFocused(!pageFocused);
            getAllKeys();
            return () => {
            };
        }, [buttonPressed])
    );

    //creates new note when the new note button is pressed.
    const createNewNote = async () => {
        try {
            ifButtonPressed(!buttonPressed);
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
    async function getAllKeys() {
        let keys = []
        try {
            keys = await AsyncStorage.getAllKeys()
            updateAllNotes(await AsyncStorage.multiGet(keys));
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getAllKeys();
    }, [buttonPressed]);


    return (
        <View style={styles.container}>
            <ScrollView style={styles.allNotes}>
                {allNotes.map((data) => {
                    return (
                        <View style={styles.individualNotes} key={data[0]}>
                            <Link onPress={() => {ifButtonPressed(!buttonPressed)}} href={`notes/note?noteId=${data[0]}`} style={[styles.notesText, styles.text]}>{JSON.parse(data[1]).name}</Link>
                            <Button
                                onPress={() => { deleteNote(data[0]) }}
                                title="Delete Note"
                                color="#376a3e"
                                accessibilityLabel="Delete Note"
                            />
                        </View>
                    )
                })};
                {/* Empty Space so the new note button does not overlap with delete button */}
                <View style={styles.emptySpace} />
            </ScrollView>
            <View style={styles.newNoteButton}>
                <Button
                    onPress={createNewNote}
                    title="New Note"
                    color="#424940"
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
    individualNotes: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 2,
        padding: 10,
        borderColor: '#42494080',
    },
    notesText: {
        fontSize: 18,
        width: '70%'
    },
    allNotes: {
        display: 'flex',
        flexDirection: 'column',
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

    },
    emptySpace: {
        height: 60,
    }
});
