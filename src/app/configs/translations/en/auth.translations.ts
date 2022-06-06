import { User } from "@everywan/models/user.model";

export const AuthenticationLanguagePartialDefinition = {
    signin: {
        fields: {
            username: {
                label: 'Username',
                placeholder: 'Insert your username'
            },
            password: {
                label: 'Password',
                placeholder: 'Choose a password'
            },
            domain: {
                label: 'Domain',
                placeholder: 'Insert your domain'
            }
        },
        actions: {
            submit: 'Login',
            recoverPassword: 'Password forgotten?',
        },
        notifications: {
            title: 'Login error'
        }
    },
    signout: {
        message: 'Logging out...'
    },
    register: {
        fields: {
            domain: {
                label: 'Domain',
                placeholder: "Insert your domain"
            },
            username: {
                label: 'Username',
                placeholder: 'Insert your username'
            },
            email: {
                label: 'E-mail',
                placeholder: 'Insert your e-mail'
            },
            password: {
                label: 'Password',
                placeholder: 'Choose a password'
            },
            confirmPassword: {
                label: 'Confirm password',
                placeholder: 'Confirm password'
            }
        },
        title: {
            create: 'User registration'
        },
        actions: {
            submit: 'Register',
            buttonConfirmRegistration: 'Confirm registration',
            buttonUndoRegistration: 'Cancel registration'
        },
        modals: {
            create: {
                title: 'Configure user',
                message: 'You are about to register your user. <br />Do you want to proceed?',
                actions: {
                    confirm: 'Register',
                    cancel: 'Cancel'
                }
            }
        },
        notifications: {
            create: {
                title: 'User registration',
                message: 'User registered succesfully'
            },
            error: {
                title: 'Register error',
                message: 'Registration failed'
            }
        }
    },
    recover: {
        headings: {
            title: 'Recover password',
            subtitle: 'Insert the email associated to your account.<br />You will receive a link to reset your password.'
        },
        fields: {
            email: {
                label: 'Email',
                placeholder: 'Insert your email address'
            },
            password: {
                label: 'Password',
                placeholder: 'Insert your new password'
            },
            confirmPassword: {
                label: 'Confirm password',
                placeholder: 'Confirm your new password'
            }
        },
        actions: {
            back: 'Go back to login',
            submit: 'Recover password',
            change: 'Change password'
        },
        notifications: {
            title: 'Recover password',
            message: 'An email has been sent to <b>{{ email }}</b>'
        }
    },
    change: {
        notifications: {
            title: 'Change password',
            message: 'Password changed correctly',
        }
    }
};
