import { Stack } from 'expo-router';

export default function RootLayout() {
    return (
        <Stack
        screenOptions={{
            headerStyle: {
                backgroundColor: '#EBEFE7'
            },
            headerTintColor: '#424940',
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 28,
            },
        }}
        >
            <Stack.Screen name="index" options={{ title: 'Settings' }} />
        </Stack>
    );
}