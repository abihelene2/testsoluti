import React, { useState, useEffect } from 'react';
import axios from 'axios'
import User from '../models/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://10.0.2.2:5000/users'

const register = async (user: User) => {
    try {
      const name = user.name
      const email = user.email
      const password = user.password
      const response = await axios.post(`${API_URL}/register`, { name, email, password });
        return response;
    } catch (error: any) {
        throw error.response|| 'Error signing up';
    }
  };
  
const login = async (user: User) => {
    try {
      const email = user.email
      const password = user.password
    
      const response = await axios.post(`${API_URL}/login`, { email, password }, { headers: { 'Content-Type': 'application/json' } });
      console.log(response)
      AsyncStorage.setItem('authToken', response.data.token);
      return response;
    } catch (error: any) {
      throw error.response || 'Error login'
    }
  };

  export {register, login};
  


