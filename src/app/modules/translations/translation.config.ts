import * as BrowserLocale from 'browser-locale';

import { LanguageDefinition as EnglishLanguageDefinition } from '@configs/translations/en';

const TranslationDefinitions = {
    en: EnglishLanguageDefinition
};

const currentBrowserLanguage = (): string => {
    return BrowserLocale();
};

export {
    TranslationDefinitions,
    currentBrowserLanguage
};
