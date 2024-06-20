import {View} from "react-native";
import {Link} from "expo-router";

export default function ListPage() {
    return (
        <View>
            <Link href="/list/1">New One</Link>
            <Link href="/list/2">New Two</Link>
            <Link href="/list/3">New Three</Link>
        </View>
    );
}