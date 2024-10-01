import {useEffect, useRef} from "react";
import {TextInput} from "react-native";

const useFocusInputWithTime = (time= 1000) => {
    const aRef = useRef<TextInput>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (aRef.current) {
                aRef.current.focus();
            }
        }, time);

        return () => clearTimeout(timer);
    }, []);

    return aRef;
}

export default useFocusInputWithTime;