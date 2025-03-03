import { Text, View, StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';

export default function NotesScreen() {
    const [title, onChangeTitle] = useState("Placeholder Title");
    const [text, onChangeText] = useState("Placeholder Text");

    return (
        <View style={styles.container}>
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
    },
    date: {
        fontSize: 20,
    }
});
