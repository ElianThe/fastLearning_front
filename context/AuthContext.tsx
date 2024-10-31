import * as SecureStore from "expo-secure-store";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
// @ts-ignore
import { API_URL, TOKEN_KEY } from "@env";

// Interface définissant les propriétés du contexte d'authentification
interface AuthProps {
    authState?: { token: string | null; authenticated: boolean | null }; //Etat de l'authentification
    onRegister?: (
        email: string,
        password: string,
        username: string,
    ) => Promise<any>; // Fonction d'inscription
    onLogin?: (email: string, password: string) => Promise<any>; //Fonction de connexion
    onLogout?: () => Promise<any>; // Fonction de déconnexion
}

// Création d'un contexte d'authentification avec les propriétés définies par AuthProps
const AuthContext = createContext<AuthProps>({});

// Hook personnalisé pour utiliser le contexte d'authentification = consumer
export const useAuth = () => {
    return useContext(AuthContext);
};

// Composant fournisseur d'authentification qui enveloppe les composants enfants = provider
export const AuthProvider = ({ children }: any) => {
    // État local pour stocker l'état d'authentification
    const [authState, setAuthState] = useState<{
        token: string | null;
        authenticated: boolean | null;
    }>({
        token: null,
        authenticated: null,
    });

    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            console.log("stored: ", token);

            if (token) {
                // Configure les en-têtes par défaut pour les requêtes HTTP avec le jeton d'authentification
                axios.defaults.headers.common["Authorization"] =
                    `Bearer ${token}`;
                // met à jour l'état d'auth si le jeton est présent
                setAuthState({
                    token,
                    authenticated: true,
                });
            }
        };

        loadToken(); // Chargement du token une seule fois au montage du composant
    }, []); // Dépendance vide pour s'exécuter une seule fois

    // Fonction pour enregistrer un nouvel utilisateur
    const register = async (
        email: string,
        password: string,
        username: string,
    ) => {
        try {
            return await axios.post(`${API_URL}/register`, {
                email,
                password,
                username,
            });
        } catch (e: any) {
            console.error(e);
            throw new Error(e.response.data.message);
        }
    };

    // Fonction pour connecter un utilisateur
    const login = async (email: string, password: string) => {
        try {
            const result = await axios.post(`${API_URL}/login`, {
                email,
                password,
            });

            const token = result.data.data.token;

            setAuthState({
                token: token,
                authenticated: true,
            });
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            await SecureStore.setItemAsync(TOKEN_KEY, token);
            console.log("Token saved successfully : " + token);
            return result;
        } catch (e: any) {
            console.error(e.response.data);
            throw new Error(e.response.data.message);
        }
    };

    // Fonction pour déconnecter un utilisateur
    const logout = async () => {
        await SecureStore.deleteItemAsync(TOKEN_KEY);

        axios.defaults.headers.common["Authorization"] = "";
        setAuthState({
            token: null,
            authenticated: false,
        });
    };

    // Valeur fournie par le contexte d'authentification
    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState,
    };
    // Retourne le fournisseur de contexte avec les enfants
    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
