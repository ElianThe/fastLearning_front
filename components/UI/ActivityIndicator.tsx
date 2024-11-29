import styled from "styled-components/native";
import { Colors } from "@/constants/Colors";

const ActivityIndicator = () => {
    return <StyledActivityIndicator size="large" color={Colors.light.activityIndicator} />;
};

export default ActivityIndicator;

const StyledActivityIndicator = styled.ActivityIndicator`
    flex: 1;
    justify-content: center;
    align-items: center;
`;
