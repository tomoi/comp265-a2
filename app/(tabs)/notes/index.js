import { Text, View, StyleSheet, ScrollView, Button } from 'react-native';
import { useLocalSearchParams, useGlobalSearchParams, Link, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';


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
    //used to refresh page when button is pressed.
    const [buttonPressed, ifButtonPressed] = useState(false);
    //keys of all of the notes saved
    const [noteKeys, refreshNoteKeys] = useState([]);

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

    async function deleteNote(noteId) {
        try {
            await AsyncStorage.removeItem(noteId);
            ifButtonPressed(!buttonPressed);
        } catch (e) {
            // remove error
        }

        console.log(noteId)
    }

    useEffect(() => {
        async function getAllKeys() {
            let keys = []
            try {
                keys = await AsyncStorage.getAllKeys()
                refreshNoteKeys(keys);
            } catch (e) {
                console.log(e)
            }
            // example console.log result:
            // ['@MyApp_user', '@MyApp_key']
        }
        getAllKeys();
    }, [buttonPressed]);


    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.displayNotes}>
                    {noteKeys.map((data) => {
                        return (
                            <View style={styles.individualNotes} key={data}>
                                <Link href={`notes/note?noteId=${data}`} style={[styles.individualNotes, styles.text]}>{data}</Link>
                                <Button
                                    onPress={() => { deleteNote(data) }}
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
