export const GeoClaimLanguagePartialDefinition = {
    list: {
        title: 'Gestione Geo Claim',
        actions: {
            filter: 'Filtra',
            feeds: 'Feeds',
            detail: 'Dettagli',
            send: 'Invia'
        },
        filters: {
            fields: {
                fromDate: 'Inviati dal',
                toDate: 'al'
            },
            actions: {
                send: 'Invia Geo Claim'
            },
        },
        headers: {
            recipientsGroupName: 'Gruppo',
            createdAt: 'Inviato il',
            updatedAt: 'Modificato il',
            actions: 'Azioni'
        }
    },
    send: {
        title: 'Invia Geo Claim',
        fields: {
            group: {
                title: 'Seleziona il gruppo',
                label: 'Gruppo',
                placeholder: 'Inserisci il gruppo'
            }
        },
        actions: {
            send: 'Invia'
        },
        modals: {
            send: {
                title: 'Invia un Geo Claim',
                message: 'Stai per inviare una Geo Claim al gruppo <b>{{ group }}</b>.<br />Sei sicuro di voler procedere ?',
                actions: {
                    confirm: 'Invia',
                    cancel: 'Annulla'
                }
            }
        },
        notifications: {
            title: 'Invia Geo Claim',
            message: 'Geo Claim inviato correttamente',
        }
    },
    feeds: {
        title: 'Geo Claim - {{ time }} - Feeds',
        headers: {
            fullName: 'Utente',
            status: 'Stato',
            lat: 'Latitudine',
            long: 'Longitudine'
        },
        filters: {
            fields: {
                status: {
                    placeholder: 'Filtra per stato',
                    sent: 'Inviate',
                    delivered: 'Ricevute',
                    withResponse: 'Risposte'
                }
            }
        },
        status: {
            sent: 'Inviata',
            delivered: 'Ricevuta',
            with_response: 'Risposte'
        },
        modals: {
            reSend: {
                title: 'Invia Geo Claim di nuovo',
                message: {
                    sent: 'Stai per reinviare un Geo Claim a utenti/dispositivi che <b>non hanno RICEVUTO</b> la GeoClaim. Sei sicuro di voler procedere ?',
                    delivered: 'Stai per reinviare un Geo Claim a utenti/dispositivi che <b>non hanno inviato RISPOSTA.</b> Sei sicuro di voler procedere ?',
                },
                actions: {
                    confirm: 'Reinvia',
                    cancel: 'Annulla'
                }
            }
        },
        notifications: {
            title: 'Reinvio Geo Claim',
            message: 'Geo Claim reinviato correttamente',
        },
        actions: {
            reSend: {
                title: 'Invia di nuovo <span class="mdi mdi-menu-down"></span>',
                notReceived: 'Invia di nuovo a utenti/dispositivi che <b>non hanno RICEVUTO</b> la Geo Claim',
                notAnswered: 'Invia di nuovo a utenti/dispositivi che <b>non hanno inviato RISPOSTA</b>'
            }
        }
    },
    stats: {
        title: 'Statistiche',
        headers: {
            receivers: 'Destinatari',
            delivered: 'Ricevute',
            sent: 'Inviate',
            withResponse: 'Risposte',
        }
    }
};
