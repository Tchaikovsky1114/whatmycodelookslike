import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import {store} from './store/store'
import CellList from './components/CellList';
import './index.css';
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
    <App />
    </Provider>
    );
  }
});
