import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { handleRegistration, validateRegistration } from '../domain/usecases/UserUseCase';

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignUp'>;

type Props = {
    navigation: ProfileScreenNavigationProp;
  };

export const SignUpScreen = ({ navigation}: Props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [errors, setErrors] = useState({name: '', email: '', password:'', passwordConfirmation: ''});

    const handleSubmit = () => {
      const { valid, errors } = validateRegistration(name, email, password, passwordConfirmation);
      setErrors(errors);
  
      if (valid) {
        handleRegistration(navigation, name, email, password);
      }
    };

     return (
        <View style={styles.container}>
           <Text style={styles.label}>Nom:</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Entrez votre nom..."
            autoCapitalize="none"
          />
          {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
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
          <View style={styles.containerPassword}>
            <Text style={styles.label}>Mot de passe:</Text>
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Entrez votre mot de passe..."
                secureTextEntry
            />
          {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}  
            <Text style={styles.label}>Confirmation du mot de passe:</Text>
                <TextInput
                    style={styles.input}
                    value={passwordConfirmation}
                    onChangeText={setPasswordConfirmation}
                    placeholder="Confirmez votre mot de passe..."
                    secureTextEntry
                />
            {errors.passwordConfirmation ? <Text style={styles.errorText}>{errors.passwordConfirmation}</Text> : null}  
          </View>
          <Button title="S'inscrire" onPress={() => handleSubmit()} />
        </View>
      );
};


export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: '#f5f5f5',
    },
    containerPassword : {
        marginTop: 25,
        marginBottom: 25
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
  
