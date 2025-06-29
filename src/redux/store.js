import { createStore } from 'redux';
import NavigationReducer from './reducers/NavigationReducer';
export default function configureStore() {
  const store = createStore(NavigationReducer);

  return { store };
}
