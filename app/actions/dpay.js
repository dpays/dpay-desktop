// @flow
import dpay from 'dpayjs';
import * as ProcessingActions from './processing';

export const DPAY_GLOBALPROPS_UPDATE = 'DPAY_GLOBALPROPS_UPDATE';
export const DPAY_GLOBALPROPS_UPDATE_RESOLVED = 'DPAY_GLOBALPROPS_UPDATE_RESOLVED';

export function refreshGlobalProps() {
  return (dispatch: () => void) => {
    dpay.api.getDynamicGlobalProperties((err, results) => {
      if (err) {
        // dispatch({
        //   type: ACCOUNT_DATA_UPDATE_FAILED,
        //   payload: err
        // });
      } else {
        dispatch({
          type: DPAY_GLOBALPROPS_UPDATE_RESOLVED,
          payload: results
        });
      }
    });
  };
}
