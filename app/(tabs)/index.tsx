import {Text, View} from "react-native";
import React from "react";
import {Link} from "expo-router";

export default function Home() {
    return (
        <View>
            <Text style={{fontFamily: "mon-b"}}>Coucou</Text>
            <Link href="/home/settings">Push Settings</Link>
            <Link href="screens/login">Login</Link>
            <Link href="screens/signup">Sign up</Link>
        </View>
    );
}