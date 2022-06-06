export const ErrorsLanguagePartialDefinition = {
    generic: 'An error occurred while performing this action.',
    forbidden: 'You are not allowed to access this resource.',
    unauthorized: 'Session expired or invalid, log in to proceed.',
    validations: {
        required: 'This field is required.',
        invalidDomain: 'The provided address is invalid.',
        maxlength: 'This field has exceeded the maximum number of characters.',
        roles: {
            required: 'Select a role for the new operator.'
        },
        passwords: {
            required: 'Password required to proceed.',
            minlength: 'The password needs to be at least {{requiredLength}} characters long',
            mismatch: '<b>Attention:</b> the passwords provided are different.'
        }
    }
};
