export const AreYouFineLanguagePartialDefinition = {
    list: {
        title: 'Are You Fine',
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
                send: 'Invia Are You Fine'
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
        title: 'Invia Are You Fine',
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
                title: 'Invia un Are You Fine',
                message: 'Stai per inviare un Are You Fine al gruppo <b>{{ group }}</b>.<br />Sei sicuro di voler procedere ?',
                actions: {
                    confirm: 'Invia',
                    cancel: 'Annulla'
                }
            }
        },
        notifications: {
            title: 'Invia Are You Fine',
            message: 'Are You Fine inviata correttamente',
        }
    },
    feeds: {
        title: 'Are You Fine - {{ time }} - Feeds',
        headers: {
            fullName: 'Utente',
            status: 'Stato',
            response: 'Risposta'
        },
        filters: {
            fields: {
                status: {
                    placeholder: 'Filtra per stato',
                    sent: 'Inviate',
                    delivered: 'Ricevute',
                    readed: 'Lette',
                    withResponse: 'Risposte',
                },
                response: {
                    placeholder: 'Filtra per risposta',
                    need_help: 'Ho bisogno di aiuto',
                    im_fine: 'Sto bene'
                }
            }
        },
        status: {
            sent: 'Inviata',
            delivered: 'Ricevuta',
            readed: 'Letta',
            with_response: 'Risposta'
        },
        responses: {
            need_help: 'Ho bisogno di aiuto',
            im_fine: 'Sto bene'
        },
        modals: {
            reSend: {
                title: 'Invia Are You Fine di nuovo',
                message: {
                    sent: 'Stai per reinviare un Are You Fine a chi <b>non ha ancora ricevuto</b> l\' Are You Fine. Sei sicuro di voler procedere ?',
                    delivered: 'Stai per reinviare un Are You Fine a chi <b>non ha ancora letto</b> l\' Are You Fine. Sei sicuro di voler procedere ?',
                },
                actions: {
                    confirm: 'Reinvia',
                    cancel: 'Annulla'
                }
            }
        },
        notifications: {
            title: 'Reinvio Are You Fine',
            message: 'Are You Fine reinviata correttamente',
        },
        actions: {
            reSend: {
                title: 'Invia di nuovo <span class="mdi mdi-menu-down"></span>',
                notReceived: 'Invia di nuovo a chi <b>non ha ancora ricevuto</b> l\' Are You Fine',
                notReaded: 'Invia di nuovo a chi <b>non ha ancora letto</b> l\' Are You Fine'
            }
        }
    },
    stats: {
        title: 'Statistiche',
        headers: {
            receivers: 'Destinatari',
            sent: 'Inviate',
            delivered: 'Ricevute',
            readed: 'Lette',
            withResponse: 'Risposte'
        }
    }
};

