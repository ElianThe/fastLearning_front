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
            <Tabs.Screen name="home" options={{
                headerShown: false,
                tabBarIcon: ({color}) => <FontAwesome5 size={24} name="brain" color={color}/>
            }}/>
            <Tabs.Screen name="list" options={{
                title: 'learn',
                headerShown: true,
                tabBarIcon: ({color}) => <FontAwesome5 size={24} name="graduation-cap" color={color}/>
            }}/>
            <Tabs.Screen name="library" options={{
                headerShown: false,
                tabBarIcon: ({color}) => <FontAwesome5 size={24} name="book" color={color}/>
            }}/>
            <Tabs.Screen name="more" options={{
                headerShown: false,
                tabBarIcon: ({color}) => <Feather name="more-horizontal" size={24} color={color}/>
            }}/>
        </Tabs>
    );
}
