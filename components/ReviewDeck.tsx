import React, {useState} from "react";
import { Animated, StyleSheet, Text, View} from "react-native";
import ButtonCard from "@/components/ButtonCard";
import RatingButtons from "@/components/RatingButtons";
import Card from "@/components/Card";

const ReviewDeck = ({data} : any) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // utilisée pour stocker l'état de la rotation de la carte
    const rotateAnim = useState(new Animated.Value(0))[0];

    // état booléen qui indique si la carte est actuellement retournée
    const [flipped, setFlipped] = useState(false);



    // Function to flip the card
    const flipCard = () => {
        // Animated.timing est une méthode fournie par React Native pour animer une valeur sur une période donnée
        // deux arguments principaux :
        // - rotateAnim: la valeur animée à modifier.
        // - Objet de configuration: qui définit la manière dont l'animation doit se dérouler.
        Animated.timing(rotateAnim, {
            toValue: flipped ? 0 : 180,
            duration: 500,
            // Indique si l'animation doit utiliser le moteur d'animation natif
            useNativeDriver: true,
        }).start();
        setFlipped(!flipped);
    };

    // fonction pour passer à la carte suivante
    const nextCard = () => {
        setCurrentIndex(currentIndex + 1);
        setFlipped(false);
        rotateAnim.setValue(0); // Reset rotation for the new card
    };

    const currentCard = data[currentIndex];
    const id = currentCard ? currentCard.id : null;
    const title = currentCard ? currentCard.title : 'No Title';
    const content = currentCard ? currentCard.content : 'No Content';
    const image = currentCard ? currentCard.image_url : 'No Image';

    return (
        <View style={styles.container}>
            {/* tant qu'il reste des cartes à réviser */}
            {currentIndex < data.length ? (
                <>
                    <Card flipped={flipped} rotateAnim={rotateAnim} title={title} description={content} image={image}/>
                    {!flipped ?
                        <ButtonCard onPress={flipCard}/> :
                        <RatingButtons onPress={nextCard} id={id} />
                    }
                </>
            ) : (
                /* s'il n'y a plus de carte à réviser */
                <Text style={styles.text}>Pas de carte à réviser</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20,
    }
});


export default ReviewDeck