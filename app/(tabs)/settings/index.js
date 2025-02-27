import { Text, View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from "expo-router";


export default function SettingsScreen() {

    const { data } = useLocalSearchParams();

    if (data === 'true') {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>These are the settings.</Text>
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>These are the other settings.{"\n"}Where I put all the super secret settings.</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
    },
});
