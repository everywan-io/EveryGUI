export interface ConfigState {
    title: string;
}

export function defineConfigInitialState(): ConfigState {
    return {
        title: ''
    };
}
