import Validator from 'validator';
import isEmpty from './is-empty';

const validateRegisterInput = (data) => {
    let errors = {};

    data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
    data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
    data.username = !isEmpty(data.username) ? data.username : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : '';

    if(!Validator.isLength(data.firstName, { min: 1, max: undefined })) {
        errors.firstName = 'First Name must be at least 1 character long.';
    }

    if(Validator.isEmpty(data.firstName)) {
        errors.firstName = 'First Name is required';
    }

    if(!Validator.isLength(data.lastName, { min: 1, max: undefined })) {
        errors.lastName = 'Last Name must be at least two characters long.';
    }

    if(Validator.isEmpty(data.lastName)) {
        errors.lastName = 'Last Name is required';
    }

    if(Validator.isEmpty(data.username)) {
        errors.username = 'Username is required';
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password is required'
    }

    if(!Validator.equals(data.confirmPassword, data.password)) {
        errors.confirmPassword = 'Password mismatch!';
    }
    if(Validator.isEmpty(data.confirmPassword)) {
        errors.confirmPassword = 'Please confirm your password!';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
    
}

export default validateRegisterInput;