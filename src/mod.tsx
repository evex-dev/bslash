import {compose, type Store} from 'redux';
import MainGUI, {HashParserHOC, AppStateHOC} from '.'
import React from 'react'
import type { GUIComponentProps, CloudManagerTypes } from './gui-types'
import { useEffect } from 'react'
import { SET_SESSION } from './reducers/session'
import { CHANGE_OPTIONS_TYPE, type BslashOptions } from './reducers/bslash'

export type { BslashOptions }

const getStore = (): Store<{}> => {
  // @ts-ignore
  return AppStateHOC.store
}

export const setSession = () => {
  const store = getStore()
  store.dispatch({ type: '' })
}

export interface Session {
    user: {
        username: string
        thumbnailUrl: string
    }
}

export interface GUIOptions extends Partial<GUIComponentProps>, CloudManagerTypes {}
export interface GUIProps {
    coreOptions: GUIOptions
    session?: Session
    bslashOptions?: Partial<BslashOptions>
}

export const GUI = (props: GUIProps) => {
    const WrappedGui = compose(
        AppStateHOC,
        HashParserHOC
    // @ts-ignore
    )(MainGUI)

    useEffect(() => {
        if (props.session) {
            getStore().dispatch({ type: SET_SESSION, session: props.session })
        }
    }, [props.session])
    useEffect(() => {
        if (props.bslashOptions) {
            getStore().dispatch({ type: CHANGE_OPTIONS_TYPE, options: props.bslashOptions })
        }
    }, [props.bslashOptions])

    return <WrappedGui {...props.coreOptions} />
}
