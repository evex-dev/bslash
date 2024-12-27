
export const SET_SESSION = 'session/SET_SESSION'

export default function reducer(state, action) {
    if (!state) {
        state = sessionInitialState
    }
    switch(action.type) {
        case SET_SESSION:
            state = {
                ...state,
                session: action.session
            }
            if (!action.session) {
                delete state.session
            }
            break
        default:
            break
    }
    return state
}
export const sessionInitialState = {
}
