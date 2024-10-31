import { Tabs } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

const TabsLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarInactiveTintColor: Colors.light.tabIconDefault,
                tabBarActiveTintColor: Colors.light.tabIconSelected,
                tabBarIconStyle: {
                    marginTop: 5,
                },
            }}
        >
            <Tabs.Screen
                name="learn"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 size={24} name="graduation-cap" color={color} />
                    ),
                    tabBarLabel: "Apprendre",
                }}
            />
            <Tabs.Screen
                name="review"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 size={24} name="brain" color={color} />
                    ),
                    tabBarLabel: "Réviser",
                }}
            />
            <Tabs.Screen
                name="folders"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => <FontAwesome5 size={24} name="book" color={color} />,
                    tabBarLabel: "Librairie",
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name="user-circle" size={24} color={color} solid />
                    ),
                    tabBarLabel: "Profile",
                }}
            />
        </Tabs>
    );
};

export default TabsLayout;
