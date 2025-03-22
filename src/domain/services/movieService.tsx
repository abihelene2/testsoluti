import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Movie from '../models/movie';

const API_URL = 'http://10.0.2.2:5000/movies'

async function getMovies () {
    try {
        const response = await axios.get(`${API_URL}`);
        return response;
      } catch (error) {
        console.error('Error fetching movies:', error);
        throw error
    }
}

async function getMovie (title: string) {
  try {
      const response = await axios.get(`${API_URL}/${title}`);
      return response;
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error
  }
}

async function addMovie(movie: Movie) {
  try {
      const response = await axios.post(`${API_URL}`, movie);
      return response;
    } catch (error) {
      console.error('Error adding movie:', error);
      throw error;
    }
}

async function deleteMovie(movieId: string) {
  try {
      console.log('movieId : ' + movieId)
      const response = await axios.delete(`${API_URL}/${movieId}`);
      return response;
    } catch (error) {
      console.error('Error deleting movie:', error);
      throw error;
    }
}
  
async function updateMovie(movie: Movie) {
  try {
      const response = await axios.put(`${API_URL}/${movie._id}`, movie);
      return response;
    } catch (error) {
      console.error('Error updating movie:', error);
      throw error;
    }
}

export {
    getMovies,
    getMovie,
    addMovie,
    deleteMovie, 
    updateMovie
};


