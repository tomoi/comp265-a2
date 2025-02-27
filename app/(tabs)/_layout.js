import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen name="notes" options={{
                title: 'Notes',
                headerShown: false,
                tabBarIcon: ({ color, focused }) => (
                    <FontAwesome name={focused ? 'sticky-note' : 'sticky-note-o'} color={color} size={24} />
                ),

            }} />
            <Tabs.Screen name="settings" options={{
                title: 'Settings',
                headerShown: false,
                tabBarIcon: ({ color, focused }) => (
                    <Ionicons name={focused ? 'settings' : 'settings-outline'} color={color} size={24} />
                ),

            }} />
            <Tabs.Screen
                name="index"
                options={{
                    tabBarItemStyle: { display: "none" },
                    
                }}
            />
        </Tabs>
    );
}
