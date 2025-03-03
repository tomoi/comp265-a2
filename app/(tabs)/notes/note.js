import { Text, View, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useState } from 'react';


export default function NotesScreen() {
    const [title, onChangeTitle] = useState("Placeholder Title");
    const [text, onChangeText] = useState("Placeholder Text");


    return (
        <ScrollView style={styles.container}>
            <TextInput
                style={[styles.title, styles.text]}
                onChangeText={onChangeTitle}
                value={title}
            />
            <Text style={[styles.text, styles.date]}>03, March, 2025</Text>
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
        marginBottom: 10,
        paddingBottom: 10,
    },
    date: {
        fontSize: 18,
        color: '#42494075',
        paddingLeft: 20,
    }
});
