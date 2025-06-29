import NAVIGATOR_ACTION_CONSTANTS from '../actiontypes/NavigationActions';

const changeNavigator = data => {
  return {
    type: NAVIGATOR_ACTION_CONSTANTS.CHANGE_NAVIGATOR,
    payload: data,
  };
};
const resetNavigator = data => {
  return {
    type: NAVIGATOR_ACTION_CONSTANTS.RESET_NAVIGATOR,
    data,
  };
};
export { changeNavigator, resetNavigator };
