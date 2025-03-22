import {Alert} from 'react-native';
import Movie from '../models/movie'
import { getMovies, getMovie, addMovie, deleteMovie, updateMovie } from '../services/movieService';

const handleGetMovies = async() => {
    try {
        const response = await getMovies();
    
        if (response.data)
        {
            return response.data
        } else {
            Alert.alert('Erreur', 'Échec de la connexion, veuillez réessayer');
        }
    } catch (error : any) {
        console.error('GetMovies failed:', error);
    }
};

const handleGetMovie = async(title: string) => {
    try {
        const response = await getMovie(title);
        if(response.status == 404)
        {
            console.log("empty case 404");
            return [];
        }
        if (response.data)
        {
            console.log(response.data)
            return response.data
        } else {
            Alert.alert('Erreur', 'Échec de la connexion, veuillez réessayer');
        }
    } catch (error : any) {

        console.error('GetMovies failed:', error);
    }
};

const handleAddMovie = async(title: string, genre: string, year: number) => {
    try {

        const movieToAdd: Movie = {
             _id: null,
            title: title, 
            genre: genre,
            year: year
        };

        const response = await addMovie(movieToAdd);
        if (response)
        {
            return Alert.alert('Succès', `Le film ${response.data.title} a été ajouté avec succès`); 
        } else {
            Alert.alert('Erreur', 'Échec de la connexion, veuillez réessayer');
        }
    } catch (error : any) {
        console.error('Delete Movies failed:', error);
    }
};

const handleDeleteMovie = async(id: string) => {
    try {
        const response = await deleteMovie(id);
    
        if (response)
        {
            return Alert.alert('Succès', `Le film a été supprimé avec succès`); 

        } else {
            Alert.alert('Erreur', 'Échec de la connexion, veuillez réessayer');
        }
    } catch (error : any) {
        console.error('Delete Movies failed:', error);
    }
};

export {handleGetMovie, handleDeleteMovie, handleGetMovies, handleAddMovie};