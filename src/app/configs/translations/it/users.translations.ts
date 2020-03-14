export const UsersLanguagePartialDefinition = {
    list: {
        title: 'Gestione utenti',
        filters: {
            fields: {
                term: {
                    placeholder: 'Cerca un utente..'
                },
                gender: {
                    placeholder: 'Seleziona genere',
                },
                account: {
                    placeholder: 'Account',
                    pending: 'In attesa',
                    active: 'Attivo'
                },
                dateRange: {
                    placeholder: 'Cerca per data di nascita',
                    fromDate: 'Nati dal',
                    toDate: 'al'
                },
                groups: {
                    placeholder: 'Gruppi'
                }
            },
            action: {
                create: 'Crea utente'
            }
        },
        headers: {
            fullname: 'Utente',
            gender: 'Sesso',
            account: 'Account',
            dob: 'Data di nascita',
            createdAt: 'Creato',
            updatedAt: 'Modificato',
            actions: 'Azioni'
        },
        actions: {
            filter: 'Filtra',
            create: 'Crea utente',
            details: {
                long: 'Dettagli utente',
                short: 'Dettagli'
            },
            edit: {
                long: 'Modifica utente',
                short: 'Modifica'
            },
            delete: {
                long: 'Cancella utente',
                short: 'Cancella'
            }
        },
        modals: {
            delete: {
                title: 'Elimina utente',
                message: 'Stai per eliminare l\'utente <b>{{ user }}</b>.<br />Sei sicuro di voler procedere con l\'eliminazione?',
                actions: {
                    confirm: 'Elimina',
                    cancel: 'Annulla'
                }
            }
        },
        notifications: {
            delete: {
                title: 'Elimina utente',
                message: 'Utente eliminato correttamente'
            }
        }
    },
    edit: {
        title: {
            create: 'Crea utente',
            edit: 'Modifica utente'
        },
        fields: {
            name: {
                label: 'Nome',
                placeholder: 'Inserisci il nome dell\'utente'
            },
            surname: {
                label: 'Cognome',
                placeholder: 'Inserisci il cognome dell\'utente'
            },
            gender: {
                label: 'Genere',
                placeholder: 'Seleziona il sesso'
            },
            account: {
                label: 'Account',
                placeholder: 'Account'
            },
            dob: {
                label: 'Data di nascita'
            },
            birthplace: {
                label: 'Luogo di nascita',
                placeholder: 'Inserisci luogo'
            },
            residentialAddress: {
                label: 'Indirizzo di residenza',
                placeholder: 'Inserisci l\'indirizzo di residenza'
            },
            resident: {
                label: 'Sono residente nel Comune di everywan',
                placeholder: 'Scegli la risposta',
                responses: {
                    yes: 'Si',
                    no: 'No'
                }
            },
            type: {
                label: 'Tipo account',
                placeholder: 'Seleziona tipologia account'
            },
            phone: {
                label: 'Numero di telefono',
                placeholder: 'Inserisci numero di telefono'
            },
            email: {
                label: 'Indirizzo email',
                placeholder: 'Sarà anche lo username'
            },
            password: {
                label: 'Password',
                placeholder: 'Inserisci la password'
            },
            passwordConfirm: {
                label: 'Conferma password',
                placeholder: 'Reinserisci la password'
            },
            fiscalCode: {
                label: 'Codice Fiscale',
                placeholder: 'Inserisci il codice fiscale'
            },
            info: {
                label: 'Informazioni generali',
                placeholder: 'Inserisci informazioni'
            },
            emergencyContacts: {
                label: 'Contatti di emergenza',
                placeholder: 'Inserisci nome e numero dei contatti'
            }
        },
        actions: {
            create: 'Crea utente',
            edit: 'Aggiorna'
        },
        notifications: {
            create: {
                title: 'Creazione utente',
                message: 'L\'utente <b>{{ fullname }}</b> è stato creato con successo'
            },
            edit: {
                title: 'Modifica utente',
                message: 'L\'utente <b>{{ fullname }}</b> è stato modificato con successo'
            }
        }
    },
    details: {
        title: 'Dettagli utente',
        fields: {
            name: {
                label: 'Nome',
                placeholder: 'Inserisci il nome dell\'utente'
            },
            surname: {
                label: 'Cognome',
                placeholder: 'Inserisci il cognome dell\'utente'
            },
            gender: {
                label: 'Genere',
                placeholder: 'Seleziona il sesso'
            },
            account: {
                label: 'Account',
                placeholder: 'Account'
            },
            dob: {
                label: 'Data di nascita'
            },
            birthplace: {
                label: 'Luogo di nascita',
                placeholder: 'Inserisci luogo'
            },
            residentialAddress: {
                label: 'Indirizzo di residenza',
                placeholder: 'Inserisci l\'indirizzo di residenza'
            },
            resident: {
                label: 'Sono residente nel Comune di everywan',
                placeholder: 'Scegli la risposta',
                responses: {
                    yes: 'Si',
                    no: 'No'
                }
            },
            type: {
                label: 'Tipo account',
                placeholder: 'Seleziona tipologia account'
            },
            phone: {
                label: 'Numero di telefono',
                placeholder: 'Inserisci numero di telefono'
            },
            email: {
                label: 'Indirizzo email',
                placeholder: 'Sarà anche lo username'
            },
            password: {
                label: 'Password',
                placeholder: 'Inserisci la password'
            },
            passwordConfirm: {
                label: 'Conferma password',
                placeholder: 'Reinserisci la password'
            },
            fiscalCode: {
                label: 'Codice Fiscale',
                placeholder: 'Inserisci il codice fiscale'
            },
            info: {
                label: 'Informazioni generali',
                placeholder: 'Nessuna informazione aggiuntiva'
            },
            emergencyContacts: {
                label: 'Contatti di emergenza',
                placeholder: 'Nessun contatto di emergenza'
            }
        },
        actions: {
            change: 'Modifica utente'
        }
    }
};
