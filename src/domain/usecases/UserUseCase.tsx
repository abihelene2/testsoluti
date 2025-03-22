import {Alert} from 'react-native';
import User from '../models/user'
import { login, register } from '../services/userServices'; 

const minLengthPassword = 6;

const handleLogin = async(navigation: any, email: string, password: string) => {
    try {
        
        const userToLog : User = {
            _id: null,
            name: null, 
            email: email,
            password: password 
        };
        const response = await login(userToLog);
        if (response.data.token) {

            navigation.navigate('Movie', response.data.name, response.data.email)
            
        } else {
            Alert.alert('Erreur', 'Échec de la connexion, veuillez réessayer');
        }
    } catch (error : any) {
        console.error('Login failed:', error);
        if(error.status == 400)
        {
            Alert.alert('Erreur', `L'email ou le mot de passe est invalide`);
        }
    }
}

const handleRegistration = async(navigation: any, name: string, email: string, password: string) => {
    try {
        
        const userToRegister: User = {
            _id: null,
            name: name, 
            email: email,
            password: password 
        };
        const response = await register(userToRegister);

        if (response.data) {
            Alert.alert('Succès', 'Compte crée avec succès' ,[
                { text: 'OK', onPress: () => navigation.navigate('Profile') }
              ]);
        } else {
            Alert.alert('Erreur', 'Échec de la connexion, veuillez réessayer');
        }
    } catch (error: any) {
        console.error('Registration failed:', error);
        if(error.status == 400)
        {
            Alert.alert('Erreur', `L'email a déjà été utilisé`);
        }
    }
}

const validateLogin = (email: string , password: string) =>
{ 
    let errors = { email: '', password: '' };
    let valid = true;

    let errorEmail: string = validateEmail(email);
    let errorPassword: string = validatePassword(password);

    console.log(errorEmail)
    console.log(errorPassword)

    if((errorEmail || errorPassword) != "")
    {
        valid = false;
        errors.email = errorEmail;
        errors.password = errorPassword;
    }


    return { valid, errors };
};

const validateRegistration = (name: string, email: string , password: string, passwordConfirmation: string) =>
{
    let errors = { name:'', email: '', password: '', passwordConfirmation: ''};
    let valid = true;

    let errorName: string = validateName(name);
    let errorEmail: string = validateEmail(email);
    let errorPassword: string = validatePassword(password);
    let errorPasswordConfirmation: string = validatePasswordConfirmation(password, passwordConfirmation);

    if((errorName|| errorEmail || errorPassword || errorPasswordConfirmation) != "")
    {
        valid = false;
        errors.name = errorName;
        errors.email = errorEmail;
        errors.password = errorPassword;
        errors.passwordConfirmation = errorPasswordConfirmation;
    }

    return {valid, errors};
};

const validateName = (name: string) =>
{
    let errorName = "";
    if (isEmpty(name)) {
        errorName = 'The name is required';
    }
    return errorName;
};

const validateEmail = (email: string) =>
{
    let errorEmail = "";
    if (isEmpty(email)) {
        errorEmail = 'The email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errorEmail = 'The format of the email is not valid';
    }
    return errorEmail;
};

const validatePassword = (password: string) =>
{
     let errorPassword = "";
    if (isEmpty(password)) {
        errorPassword = 'The password is required';
    } else if (password.length < minLengthPassword) {
        errorPassword = 'The password is too short';
    }
    return errorPassword;
};

const validatePasswordConfirmation = (password: string, passwordConfirmation: string) =>
{
    let errorPasswordConfirmation = ""
    if(isEmpty(passwordConfirmation))
    {
        errorPasswordConfirmation = "The confirmation of the password is required";
    }
    else if(!isMatch(password, passwordConfirmation))
    {
        errorPasswordConfirmation = "The confirmation of the password does not match the password";
    }

    return errorPasswordConfirmation;
};

const isEmpty = (value: string) => 
{
    if(!value || value == '') return true;
    return false;
}

const isMatch = (value: string, valueToVerify:string) => 
{
    if(value === valueToVerify) return true;
     return false;
}

export {handleLogin, handleRegistration, validateRegistration, validateLogin};