import {
    Dimensions,
    FlatList,
    SafeAreaView,
    Image,
    View,
    ImageSourcePropType,
    Text,
    StyleSheet,
    TouchableOpacity,
    NativeScrollEvent,
    NativeSyntheticEvent,
} from "react-native";
import { useRef, useState } from "react";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";

const { width, height } = Dimensions.get("window");

type SlideProps = {
    id: string;
    image: ImageSourcePropType;
    title: string;
    subtitle: string;
};

const slides: SlideProps[] = [
    {
        id: "1",
        image: require("@/assets/images/onBoarding/addFolder.png"),
        title: "Créer un dossier",
        subtitle: "La première chose à faire c'est créer un dossier.",
    },
    {
        id: "2",
        image: require("@/assets/images/onBoarding/newCard.png"),
        title: "Créer une carte",
        subtitle:
            "Puis, créer une carte qui contient les informations dont tu as besoin.",
    },
    {
        id: "3",
        image: require("@/assets/images/onBoarding/review.png"),
        title: "Révision des cartes",
        subtitle:
            "Ton but est de te connecter à l'application tous les jours et de réviser les cartes.",
    },
    /*{
        id: "4",
        image: require("@/assets/images/onBoarding/reviser.jpg"),
        title: "Déplacement des cartes",
        subtitle:
            "Si tu choisis la bonne réponse, la carte passe au niveau suivant. Dans le cas contraire, la carte baisse d'un niveau",
    },*/
];

const Slide = ({ item }: { item: SlideProps }) => {
    return (
        <View style={{ alignItems: "center", maxWidth: width }}>
            <Image
                source={item.image}
                style={{ height: "75%", width: width, resizeMode: "contain" }}
            />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
    );
};

const OnBoardingScreen = () => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const ref: { current: FlatList | null } = useRef(null);

    const Footer = () => {
        return (
            <View
                style={{
                    justifyContent: "space-between",
                    paddingHorizontal: 20,
                    height: height * 0.25,
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        marginTop: 20,
                    }}
                >
                    {slides.map((_, index) => (
                        <View
                            style={[
                                styles.indicator,
                                currentSlideIndex === index && {
                                    backgroundColor: Colors.light.background,
                                    width: 25,
                                },
                            ]}
                            key={index}
                        />
                    ))}
                </View>
                <View style={{ marginBottom: 20 }}>
                    {currentSlideIndex === slides.length - 1 ? (
                        <View style={{ height: 50 }}>
                            <TouchableOpacity
                                style={[styles.btn]}
                                onPress={() => router.replace("/screens/auth/HomeAuthScreen")}
                            >
                                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                                    GET STARTED
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity
                                onPress={skip}
                                style={[
                                    styles.btn,
                                    {
                                        backgroundColor: "transparent",
                                        borderWidth: 1,
                                        borderColor: "#fff",
                                    },
                                ]}
                            >
                                <Text
                                    style={{
                                        fontSize: 15,
                                        fontWeight: "bold",
                                        color: "#fff",
                                    }}
                                >
                                    SKIP
                                </Text>
                            </TouchableOpacity>
                            <View style={{ width: 15 }} />
                            <TouchableOpacity style={[styles.btn]} onPress={goNextSlide}>
                                <Text style={{ fontSize: 15, fontWeight: "bold" }}>NEXT</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        );
    };

    const updateCurrentSlideIndex = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / width);
        setCurrentSlideIndex(currentIndex);
    };

    const skip = () => {
        const lastSlideIndex = slides.length - 1;
        const offset = lastSlideIndex * width;
        ref?.current?.scrollToOffset({ offset });
        setCurrentSlideIndex(lastSlideIndex);
    };

    const goNextSlide = () => {
        const nextSlideIndex = currentSlideIndex + 1;
        if (nextSlideIndex !== slides.length) {
            const offset = nextSlideIndex * width;
            ref?.current?.scrollToOffset({ offset });
            setCurrentSlideIndex(currentSlideIndex + 1);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#003049" }}>
            <FlatList
                ref={ref}
                onMomentumScrollEnd={updateCurrentSlideIndex}
                showsHorizontalScrollIndicator={false}
                horizontal
                showsVerticalScrollIndicator={false}
                data={slides}
                renderItem={({ item }: { item: SlideProps }) => <Slide item={item} />}
                keyExtractor={(item) => item.id}
                pagingEnabled
            />
            <Footer />
        </SafeAreaView>
    );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
    title: {
        textAlign: "center",
        color: "#fff",
        fontSize: 22,
        marginTop: 20,
        fontWeight: "bold",
    },
    subtitle: {
        color: "#fff",
        fontSize: 13,
        marginTop: 10,
        textAlign: "center",
        maxWidth: "70%",
        lineHeight: 23,
    },
    indicator: {
        height: 2.5,
        width: 10,
        backgroundColor: "grey",
        marginHorizontal: 3,
        borderRadius: 2,
    },
    btn: {
        flex: 1,
        height: 50,
        borderRadius: 5,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
