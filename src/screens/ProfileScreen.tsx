import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { handleLogin, validateLogin } from '../domain/usecases/UserUseCase';

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;

type Props = {
    navigation: ProfileScreenNavigationProp;
  };

export const ProfileScreen = ({ navigation}: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({email: '', password: '' })

  const handleSubmit = () => {
    const { valid, errors } = validateLogin(email, password);
    setErrors(errors);

    if (valid) {
      handleLogin(navigation, email, password);
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.label}>Courriel:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholder="Entrez votre courriel..."
        autoCapitalize="none"
      />
      {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

      <Text style={styles.label}>Mot de passe:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Entrez votre mot de passe..."
        secureTextEntry
      />
      {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
      <Button title="Se connecter" onPress={() => handleSubmit()} />
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.signupText}>Vous n'avez pas de compte ? S'inscrire</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: '#f5f5f5',
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    errorText: { 
      color: 'red', 
      marginBottom: 10 
    },
    input: {
      height: 50,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      backgroundColor: '#fff',
      paddingHorizontal: 10,
      marginBottom: 15,
    },
    signupText: {
        marginTop: 15,
        color: '#007bff',
        textAlign: 'center',
        textDecorationLine: 'underline',
        fontSize: 14,
      },
});
  
