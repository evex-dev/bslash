import App from './app'
import ReactDOM from 'react-dom';

const div = document.createElement('div')
div.style.height = '100dvh'
document.body.append(div)
ReactDOM.render(<App />, div)
