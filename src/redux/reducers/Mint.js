import {
    CHECK_MINTABLE_FAILED,
    CHECK_MINTABLE_SUCCESS,
    GET_MINTDATA_FAILED,
    GET_MINTDATA_SUCCESS
} from "../shared/ActionTypes.js";

const INIT_STATE = {
    failedMsg: null,
    minted: null,
    count: null,
    mintData: [],
};

const mintReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case CHECK_MINTABLE_FAILED: {
            return {
                ...state,
                failedMsg: action.payload.failedMsg,
                minted: action.payload.minted,
            };
        }
        case CHECK_MINTABLE_SUCCESS: {
            return {
                ...state,
                count: action.payload.count,
            };
        }
        case GET_MINTDATA_SUCCESS: {
            return {
                ...state,
                mintData: action.payload.mintData,
            }
        }
        case GET_MINTDATA_FAILED: {
            return {
                ...state,
                mintData: [],
            }
        }
        default:
            return state;
    }
};
export default mintReducer;