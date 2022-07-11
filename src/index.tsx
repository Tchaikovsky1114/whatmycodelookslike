import ReactDom from 'react-dom'


export const App = () => {
  return <h1>new project</h1>
}


ReactDom.render(<App />, document.querySelector('#root'))