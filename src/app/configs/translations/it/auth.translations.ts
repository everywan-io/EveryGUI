export const AuthenticationLanguagePartialDefinition = {
    signin: {
        fields: {
            username: {
                label: 'Username',
                placeholder: 'Inserisci il tuo username'
            },
            password: {
                label: 'Password',
                placeholder: 'Inserisci la password'
            },
            domain: {
                label: 'Domain',
                placeholder: 'Inserisci il dominio'
            }
        },
        actions: {
            submit: 'Effettua l\'accesso',
            recoverPassword: 'Password dimenticata?',
        },
        notifications: {
            title: 'Errore durante l\'accesso'
        }
    },
    signout: {
        message: 'Effettuo la disconnessione...'
    },
    register: {
        fields: {
            domain: {
                label: 'Domain',
                placeholder: "Inserisci il dominio"
            },
            username: {
                label: 'Username',
                placeholder: 'Inserisci username'
            },
            email: {
                label: 'E-mail',
                placeholder: 'Inserisci e-mail'
            },
            password: {
                label: 'Password',
                placeholder: 'Inserisci password'
            },
            confirmPassword: {
                label: 'Conferma password',
                placeholder: 'Conferma la password'
            }
        },
        title: {
            create: 'Registrazione utente'
        },
        actions: {
            submit: 'Registrati',
            buttonConfirmRegistration: 'Conferma registrazione',
            buttonUndoRegistration: 'Annulla registrazione'
        },
        modals: {
            create: {
                title: 'Configure user',
                message: 'Stai per registrare l\'utente. <br />Sei sicuro di voler procedere?',
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
            title: 'Recupera password',
            subtitle: 'Inserisci l\'e-mail associata al tuo account.<br />Riceverai un link per il reset della password.'
        },
        fields: {
            email: {
                label: 'Email',
                placeholder: 'Inserisci l\'indirizzo email'
            },
            password: {
                label: 'Password',
                placeholder: 'Inserisci la nuova password'
            },
            confirmPassword: {
                label: 'Conferma password',
                placeholder: 'Conferma la nuova password'
            }
        },
        actions: {
            back: 'Torna al login',
            submit: 'Recupera password',
            change: 'Cambia password'
        },
        notifications: {
            title: 'Recupero password',
            message: 'Abbiamo inviato una email all\'indirizzo <b>{{ email }}</b>'
        }
    },
    change: {
        notifications: {
            title: 'Modifica password',
            message: 'La password è stata aggiornata correttamente',
        }
    }
};
