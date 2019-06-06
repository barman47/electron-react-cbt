import Validator from 'validator';
import isEmpty from './is-empty';

const validateLoginInput = (data) => {
    let errors = {};

    data.username = !isEmpty(data.username) ? data.username : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if(Validator.isEmpty(data.username)) {
        errors.username = 'Please provide your username';
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Please enter your password'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
    
}

export default validateLoginInput;