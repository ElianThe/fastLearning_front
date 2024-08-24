import {Tabs} from "expo-router";
import {FontAwesome5} from "@expo/vector-icons";
import Feather from '@expo/vector-icons/Feather';

export default () => {
    return (
        /* barre d'onglets en bas de l'ecran */
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: 'blue',
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
            <Tabs.Screen name="home" options={{
                headerShown: false,
                tabBarIcon: ({color}) => <FontAwesome5 size={24} name="brain" color={color}/>,
                tabBarLabel: 'Réviser'
            }}/>
            <Tabs.Screen name="library" options={{
                headerShown: false,
                tabBarIcon: ({color}) => <FontAwesome5 size={24} name="book" color={color}/>,
                tabBarLabel: 'Librairie'
            }}/>
            <Tabs.Screen name="more" options={{
                headerShown: false,
                tabBarIcon: ({color}) => <Feather name="more-horizontal" size={24} color={color}/>,
                tabBarLabel: 'Paramètres'
            }}/>
        </Tabs>
    );
}
