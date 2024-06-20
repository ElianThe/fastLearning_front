import {Tabs} from "expo-router";
import {FontAwesome5} from "@expo/vector-icons";
import Feather from '@expo/vector-icons/Feather';
import {Button} from "react-native";
import {useAuth} from "@/app/context/AuthContext";

export default () => {
    const {onLogout} = useAuth();
    return (

        /* barre d'onglets en bas de l'ecran */
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: 'blue',
                /*tabBarShowLabel: false,*/
                tabBarStyle: {justifyContent: 'center'},
                tabBarIconStyle: {
                    marginTop: 5,
                },
            }}
        >
            <Tabs.Screen name="index" options={{
                headerRight: () => <Button onPress={onLogout} title="logout" />,
                tabBarIcon: ({color}) => <FontAwesome5 size={24} name="home" color={color}/>
            }}/>
            <Tabs.Screen name="review" options={{
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
            <Tabs.Screen name="search" options={{
                headerShown: false,
                tabBarIcon: ({color}) => <Feather size={24} name="search" color={color}/>
            }}/>
        </Tabs>
    );
}