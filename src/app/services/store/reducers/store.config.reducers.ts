import * as Actions from '@services/store/actions/store.config.actions';

import {StoreActions} from '@everywan/app.constants';
import {ConfigState, defineConfigInitialState} from '@services/store/states/store.config.state';

const initialState: ConfigState = defineConfigInitialState();

export function StoreConfigReducers(state: ConfigState = initialState, action: Actions.StoreConfigActions): ConfigState {
    let cast: Actions.ConfigTitleChange;

    switch (action.type) {
        case StoreActions.STORE_CONFIG_TITLE_UPDATE:
            cast = action as Actions.ConfigTitleChange;

            return {
                title: action.payload,
                ...cast
            };
        default:
            return state;
    }
}
