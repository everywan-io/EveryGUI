export const NoticesLanguagePartialDefinition = {
    list: {
        title: 'Gestione notice',
        actions: {
            filter: 'Filtra',
            feeds: 'Feeds',
            detail: 'Dettagli',
            create: 'Crea'
        },
        filters: {
            fields: {
                type: {
                    placeholder: 'Seleziona il tipo'
                },
                fromDate: 'Inviati dal',
                toDate: 'al'
            },
            actions: {
                create: 'Crea notice',
            },
        },
        headers: {
            title: 'Titolo',
            body: 'Contenuto',
            recipientsGroupName: 'Gruppo',
            titlePreview: 'Titolo preview',
            bodyPreview: 'Contenuto preview',
            type: 'Tipo',
            createdAt: 'Inviato il',
            updatedAt: 'Modificato il',
            actions: 'Azioni'
        },
        modals: {
            resend: {
                title: 'Rinvio della notice',
                message: 'Sei sicuro di voler inviare di nuovo questa notice?',
                actions: {
                    confirm: 'Invia di nuovo',
                    cancel: 'Annulla'
                }
            }
        }
    },
    edit: {
        title: {
            create: 'Crea Notice',
            details: 'Dettagli Notice'
        },
        fields: {
            title: {
                label: 'Titolo',
                placeholder: 'Inserisci il titolo'
            },
            body: {
                label: 'Contenuto',
                placeholder: 'Inserisci i contenuto'
            },
            titlePreview: {
                label: 'Titolo della preview',
                placeholder: 'Inserisci il titolo della preview',
                checkLenght: '<b>{{ length }}</b> di <b>{{ maxLength }}</b> caratteri'
            },
            bodyPreview: {
                label: 'Contenuto della preview',
                placeholder: 'Inserisci il contenuto della preview',
                checkLenght: '<b>{{ length }}</b> di <b>{{ maxLength }}</b> caratteri'
            },
            type: {
                label: 'Tipo di notice',
                placeholder: 'Seleziona il tipo di notice'
            },
            category: {
                label: 'Categoria',
                placeholder: 'Seleziona una categoria'
            },
            frequencyDate: {
                label: 'Giorno',
                placeholder: 'Seleziona il giorno'
            },
            frequencyTime: {
                label: 'Ora',
                placeholder: 'Seleziona l\' ora'
            },
            group: {
                label: 'Gruppo',
                placeholder: 'Inserisci il gruppo'
            },
            attachments: {
                label: 'Allegati',
                placeholder: 'Selezione i file da allegare'
            },
            listAttachments: {
                label: 'Allegati inviati:',
                empty: 'Nessun allegato inviato'
            }
        },
        actions: {
            create: 'Invia Notice'
        },
        modals: {
            create: {
                title: 'Invia notice',
                message: 'Stai per inviare una Notice al gruppo <b>{{ group }}</b>.<br />Sei sicuro di voler procedere ?',
                actions: {
                    confirm: 'Invia',
                    cancel: 'Annulla'
                }
            }
        },
        notifications: {
            title: 'Invia notice',
            message: 'Notice inviata correttamente',
        }
    },
    feeds: {
        title: 'Report Notice',
        headers: {
            fullName: 'Utente',
            status: 'Stato',
        },
        filters: {
            fields: {
                status: {
                    placeholder: 'Filtra per stato',
                    sent: 'Inviate',
                    delivered: 'Ricevute',
                    readed: 'Lette'
                }
            }
        },
        status: {
            sent: 'Inviata',
            delivered: 'Ricevuta',
            readed: 'Letta'
        },
        modals: {
            reSend: {
                title: 'Invia la notice di nuovo',
                message: {
                    sent: 'Stai per reinviare la notice a chi non ha ancora letto la prima notice. Sei sicuro di voler procedere ?',
                    delivered: 'Stai per reinviare la Notice a chi non ha ancora ricevuto la prima notice. Sei sicuro di voler procedere ?',
                },
                actions: {
                    confirm: 'Reinvia',
                    cancel: 'Annulla'
                }
            }
        },
        notifications: {
            title: 'Reinvio notice',
            message: 'Notice reinviata correttamente',
        },
        actions: {
            reSend: {
                title: 'Invia di nuovo <span class="mdi mdi-menu-down"></span>',
                notReceived: 'Invia di nuovo a chi <b>non ha ancora ricevuto</b> la notices',
                notReaded: 'Invia di nuovo a chi <b>non ha ancora letto</b> la notices'
            }
        }
    },
    stats: {
        title: 'Statistiche',
        headers: {
            receivers: 'Destinatari',
            readed: 'Lette',
            delivered: 'Ricevute',
            sent: 'Inviate',
        }
    }
};

