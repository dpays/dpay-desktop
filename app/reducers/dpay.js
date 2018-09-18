// @flow
import {
  DPAY_GLOBALPROPS_UPDATE,
  DPAY_GLOBALPROPS_UPDATE_RESOLVED
} from '../actions/dpay';

type actionType = {
  type: string,
  payload: any
};

const defaultProps = {
  props: {
    time: null
  }
}

export default function account(state: any = defaultProps, action: actionType) {
  // console.log('>>> reducers/account', state, action);
  switch (action.type) {
    case DPAY_GLOBALPROPS_UPDATE_RESOLVED:
      return Object.assign({}, state, {
        props: action.payload
      });
    default: {
      return state;
    }
  }
}
