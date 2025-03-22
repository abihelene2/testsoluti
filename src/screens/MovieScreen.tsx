import React, { useState } from "react";
import { View, TextInput, FlatList, Text, Button, ActivityIndicator, StyleSheet, Alert, Modal, TouchableOpacity } from "react-native";
import Movie from "../domain/models/movie";
import { handleGetMovie, handleDeleteMovie, handleAddMovie } from "../domain/usecases/MovieUseCase"; 

export const MovieScreen = () => {
    //Research
    const [movieName, setMovieName] = useState<string>("");
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);  // Loading state

    //Adding movie
    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const [newMovieTitle, setNewMovieTitle] = useState<string>("");
    const [newMovieGenre, setNewMovieGenre] = useState<string>("");
    const [newMovieYear, setNewMovieYear] = useState<number| null>(null);

    ///////////////////////////////////
    //Functions actions
    //////////////////////////////////
    const searchMovies = async (query: string) => {
        if (!query) {
            setMovies([]);
            return;
        }
        setLoading(true); 
        try {
            const movies = await handleGetMovie(query); 
            setMovies(movies);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteMovie = async (movieId: string) => {
      try {
         
          await handleDeleteMovie(movieId);
          setMovies(movies.filter((movie) => movie._id !== movieId));
      } catch (error) {
          console.error("Error deleting movie:", error);
      }
    };

    const addMovie = async () => {
      try {
         await handleAddMovie(newMovieTitle, newMovieGenre, newMovieYear)
         setModalVisible(false);
         setNewMovieTitle("");
         setNewMovieGenre("")
         setNewMovieYear(null)
         
      } catch (error) {
          console.error("Error deleting movie:", error)
      }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Rechercher un film..."
                value={movieName}
                onChangeText={(text) => {
                    setMovieName(text); 
                    searchMovies(text);
                }}
            />
            {loading && <ActivityIndicator size="large" color="#000" />} {/* Show loading indicator */}
            
            {/* Display movies if available */}
            {movies.length === 0 && !loading && (
                <Text style={styles.noResults}>Aucun film trouvé</Text>
            )}

            <FlatList
                data={movies}
                keyExtractor={(item) => item._id} // Use item id as key
                renderItem={({ item }) => (
                    <View style={styles.movieItem}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Button title="Supprimer" onPress={() => deleteMovie(item._id)} />
                    </View>
                )}
                ItemSeparatorComponent={() => <View style={styles.separator} />}  
            />
             <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
           <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Ajouter un film</Text>
                        <Text style={styles.label}>Titre</Text>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Entrer le titre du film"
                            value={newMovieTitle}
                            onChangeText={setNewMovieTitle}
                        />
                        <Text style={styles.label}>Genre</Text>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Entrer le genre du film"
                            value={newMovieGenre}
                            onChangeText={setNewMovieGenre}
                        />
                        <Text style={styles.label}>Année</Text>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Entrer l'année du film"
                            value={newMovieYear}
                            onChangeText={setNewMovieYear}
                        />
                        <View style={styles.modalButtons}>
                            <Button title="Annuler" onPress={() => setModalVisible(false)} />
                            <Button title="Ajouter un film" onPress={() => addMovie()} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>

    );
};

export default MovieScreen;

const styles = StyleSheet.create({
    container: { padding: 20 },
    input: { 
        height: 40, 
        borderBottomWidth: 1, 
        marginBottom: 10, 
        fontSize: 18 
    },
    separator: { 
      height: 1, 
      backgroundColor: "#ddd", 
      marginVertical: 10 },
    movieItem: { 
      flexDirection: "row", 
      alignItems: "center", 
      marginBottom: 10 },
    poster: {
      width: 50, 
      height: 75, 
      marginRight: 10, 
      borderRadius: 5 },
    title: { 
      fontSize: 16, 
      fontWeight: "bold",
      marginRight: 10},
    label: {
      alignSelf: 'flex-start' ,
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 5},
    noResults: { 
      fontSize: 16, 
      color: "#777", 
      textAlign: "center", 
      marginTop: 20 },
      addButton: {
        position: "absolute", 
       bottom: 0, 
        right: 20, 
        width: 60, 
        height: 60, 
        borderRadius: 30, 
        backgroundColor: "#007BFF", 
        justifyContent: "center", 
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    addButtonText: {
        fontSize: 30,
        color: "#fff",
        fontWeight: "bold",
    },
    modalBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", 
    },
    modalContainer: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        width: "80%",
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    modalInput: {
        height: 40,
        width: "100%",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingLeft: 10,
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    }
});
