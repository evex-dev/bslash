import type { Action } from "redux";

export const CHANGE_OPTIONS_TYPE = 'bslash/CHANGE_OPTIONS'
export interface BslashOptions {
    getProfileURL: (username: string) => string
    getMystuffURL: () => string
    getAccountSettingsURL: () => string
}
export default function reducer(state: BslashOptions = bslashInitialState, action: Action & { options: BslashOptions }): BslashOptions {
    switch(action.type) {
        case CHANGE_OPTIONS_TYPE:
            state = {
                ...bslashInitialState,
                ...state,
                ...action.options
            }
            break
    }
    return state
}
export const bslashInitialState: BslashOptions = {
  getProfileURL: (name) => '#',
  getMystuffURL: () => '#',
  getAccountSettingsURL: () => '#'
}
