export const SignalsLanguagePartialDefinition = {
    list: {
        title: 'Gestione signals',
        actions: {
            filter: 'Filtra',
        },
        filters: {
            fields: {
                search: 'Cerca',
                fromDate: 'Inviati dal',
                toDate: 'al'
            }
        },
        headers: {
            object: 'Oggetto',
            body: 'Contenuto',
            category: 'Categoria',
            response: 'Risposta',
            attachments: 'Allegati',
            sender: 'Utente',
            readed: 'Letta',
            createdAt: 'Inviato il',
            updatedAt: 'Modificato il',
        },
        fields: {
            readed: {
                yes: 'Si',
                no: 'No'
            },
            response: {
                yes: 'Si',
                no: 'No'
            }
        }
    },
    details: {
        title: 'Dettagli',
        actions: {
            sendResponse: 'Invia risposta'
        }
    },
    response: {
        title: 'Crea risposta',
        fields: {
            text: {
                label: 'Testo',
                placeholder: 'Scrivi la risposta'
            },
            attachments: {
                label: 'allegati'
            }
        },
        actions: {
            respond: 'Rispondi'
        },
        modals: {
            respond: {
                title: 'Invia risposta',
                message: 'Stai per inviare la risposta alla signal. Sei sicuro di voler procedere ?',
                actions: {
                    confirm: 'Rispondi',
                    cancel: 'Annulla'
                }
            }
        },
        notifications: {
            title: 'Risposta alla signal',
            message: 'Risposta inviata correttamente',
        },
    }
};
