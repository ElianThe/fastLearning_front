import {useEffect, useRef} from "react";
import {TextInput} from "react-native";

const useFocusInputWithTime = (time= 1000) => {
    const aRef = useRef<TextInput>(null);

    useEffect(() => {
        const currentRef = aRef.current;
        const timer = setTimeout(() => {
            if (currentRef) {
                currentRef.focus();
            }
        }, time);

        return () => {
            clearTimeout(timer);
            currentRef?.blur();
        };
    }, []);

    return aRef;
}

export default useFocusInputWithTime;