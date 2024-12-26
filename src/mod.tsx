import {compose} from 'redux';
import MainGUI, {HashParserHOC, AppStateHOC} from '.'
import React from 'react'
import type { GUIComponentProps, CloudManagerTypes } from './gui-types'

export interface GUIProps extends Partial<GUIComponentProps>, CloudManagerTypes {
}

export const GUI = (props: GUIProps) => {
    const WrappedGui = compose(
        AppStateHOC,
        HashParserHOC
    // @ts-ignore
    )(MainGUI)

    // TODO a hack for testing the backpack, allow backpack host to be set by url param
    const backpackHostMatches = window.location.href.match(/[?&]backpack_host=([^&]*)&?/);
    const backpackHost = backpackHostMatches ? backpackHostMatches[1] : null;

    if (import.meta.env.NODE_ENV === 'production' && typeof window === 'object') {
        // Warn before navigating away
        window.onbeforeunload = () => true;
    }

    return <WrappedGui {...props} />
}
