import { Text, View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from "expo-router";


export default function SettingsScreen() {

return (
    <View>
        <Text style={styles.settings}>Language Settings</Text>
        <Text style={styles.settings}>Font Size</Text>
        <Text style={styles.settings}>Appearance</Text>
        <Text style={styles.settings}>Narrator</Text>
        <Text style={styles.settings}>Account Settings</Text>
        <Text style={styles.settings}>About the App</Text>
    </View>
)

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
    settings: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 2,
        padding: 15,
        fontSize: 18,
        color: '#424940',
        borderColor: '#42494080',
    },

    allNotes: {
        display: 'flex',
        flexDirection: 'column',
    },
});

