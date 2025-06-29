import ACTION_TYPES from '../actiontypes/NavigationActions';
const initialState = { isLoggedIn: false };

const NavigationReducer = (state = initialState, { type, payload }) => {
  console.log('payload', payload);
  switch (type) {
    case ACTION_TYPES.CHANGE_NAVIGATOR:
      return { ...state, isLoggedIn: payload };
    case ACTION_TYPES.RESET_NAVIGATOR:
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
};
export default NavigationReducer;
