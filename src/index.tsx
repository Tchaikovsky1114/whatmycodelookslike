import { createRoot } from 'react-dom/client';
import CodeCell from './components/CodeCell';
import './index.css';
const App = () => {

  return (
    <>
    <CodeCell />

    </>
  )
}

let container: any;

document.addEventListener('DOMContentLoaded', function (event) {
  if (!container) {
    container = document.getElementById('root') as HTMLElement;
    const root = createRoot(container);
    root.render(<App />);
  }
});
