import { Text, View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from "expo-router";

export default function DetailsScreen() {

    const { data } = useLocalSearchParams();

    if (data === 'true') {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>I SAID NOT TO CLICK IT</Text>
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>This is where details of the app belong.{"\n"}Many details that I am putting right here.</Text>
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
