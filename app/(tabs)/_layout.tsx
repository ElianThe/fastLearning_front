import {Tabs} from "expo-router";
import {FontAwesome5} from "@expo/vector-icons";

const Layout = () => {
    return (
        /* barre d'onglets en bas de l'ecran */
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#003049',
                tabBarStyle: {justifyContent: 'center'},
                tabBarIconStyle: {
                    marginTop: 5,
                },
            }}
        >
            <Tabs.Screen name="learn" options={{
                headerShown: false,
                tabBarIcon: ({color}) => <FontAwesome5 size={24} name="graduation-cap" color={color}/>,
                tabBarLabel: 'Apprendre'
            }}/>
            <Tabs.Screen name="review" options={{
                headerShown: false,
                tabBarIcon: ({color}) => <FontAwesome5 size={24} name="brain" color={color}/>,
                tabBarLabel: 'Réviser'
            }}/>
            <Tabs.Screen name="library" options={{
                headerShown: false,
                tabBarIcon: ({color}) => <FontAwesome5 size={24} name="book" color={color}/>,
                tabBarLabel: 'Librairie'
            }}/>
            <Tabs.Screen name="profile" options={{
                headerShown: false,
                tabBarIcon: ({color}) => <FontAwesome5 name="user-circle" size={24} color={color} solid />,
                tabBarLabel: 'Profile'
            }}/>
        </Tabs>
    );
}

export default Layout;
