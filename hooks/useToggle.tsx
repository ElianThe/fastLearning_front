import { useState } from "react";

const useToggle = (stateProps = false): [boolean, () => void] => {
    const [state, setState] = useState(stateProps);

    const toggleState = () => setState((v) => !v);

    return [state, toggleState];
};

export default useToggle;
