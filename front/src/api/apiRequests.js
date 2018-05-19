import store from '../store/store';
import { fetch } from './api';
// import {
//     fetchCtorsRequest,
//     fetchCtorsFailure,
//     fetchCtorsSuccess,
//     fetchCtorParamsRequest,
//     fetchCtorParamsFailure,
//     fetchCtorParamsSuccess,
// } from '../app/common/ctor-card/CtorsActions';

const { dispatch } = store;

// =============================================================================
// Constructors
// =============================================================================

export function getConstructors() {
    const result = fetch('/constructors', undefined, 'get');

    dispatch(fetchCtorsRequest());

    result
        .then(response => {
            if (response.status === 200) {
                dispatch(fetchCtorsSuccess(response.data))
            }
        })
        .catch(error => {
            dispatch(fetchCtorsFailure(error.message))
        });

    return result;
};
