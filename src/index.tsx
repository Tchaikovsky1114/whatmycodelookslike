import '@fortawesome/fontawesome-free/css/all.min.css'
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import {store,persistor} from './store/store'
import CellList from './components/CellList';
import './index.css';
import { PersistGate } from 'redux-persist/integration/react';
const App = () => {

  return (
    <>
    
    <CellList />
    </>
  )
}

let container: any;

document.addEventListener('DOMContentLoaded', function (event) {
  if (!container) {
    container = document.getElementById('root') as HTMLElement;
    const root = createRoot(container);
    root.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
    </Provider>
    );
  }
});
