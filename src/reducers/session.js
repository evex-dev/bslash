export default function reducer(state, action) {
    if (!state) {
        state = sessionInitialState
    }
    switch(action.type) {
        default:
            break
    }
    return state
}
export const sessionInitialState = {
    session: {
        user: {
            username: 'nakasyou'
        }
    }
}
