import {
    CHECK_MINTABLE_SUCCESS,
    CHECK_MINTABLE_FAILED,
    GET_MINTDATA_SUCCESS,
    GET_MINTDATA_FAILED
} from "../shared/ActionTypes.js";
import authAxios from "../apis/axios";
import swal from 'sweetalert';

export const onCheckMintable = ({
    address
}) => {
    return async (dispatch) => {
        const body = {
            address
        };
        try {
            const res = await authAxios.post("/checkMintable", body);
            if (res.data.success == false) {
                dispatch({
                    type: CHECK_MINTABLE_FAILED,
                    payload: {
                        failedMsg: res.data.message,
                        minted: res.data.minted,
                        soldout: res.data.soldout
                    },
                });
            } else {
                dispatch({
                    type: CHECK_MINTABLE_SUCCESS,
                    payload: {
                        count: res.data.count,
                    },
                });
            }
        } catch (err) {
            // swal("Sorry!", "Network Error", "error");
            dispatch({
                type: CHECK_MINTABLE_FAILED,
                payload: {
                    failedMsg: "Network Error",
                },
            });
            console.log("error!!!!", err);
        }
    };
};

export const onGetMintData = ({
    address, count
}) => {
    return async (dispatch) => {
        const body = {
            address, count
        };
        try {
            const res = await authAxios.post("/getMintData", body);
            if (res.data.success == false) {
                swal("Sorry!", res.data.message, "error");
                dispatch({
                    type: GET_MINTDATA_FAILED,
                });
            } else {
                dispatch({
                    type: GET_MINTDATA_SUCCESS,
                    payload: {
                        mintData: res.data
                    },
                });
            }
        } catch (err) {
            console.log("error!!!!", err);
            swal("Sorry!", "Network Error", "error");
            dispatch({
                type: GET_MINTDATA_FAILED,
            });
        }
    };
};