import App from './app'
import { createRoot } from 'react-dom/client';

const div = document.createElement('div')
div.style.height = '100dvh'
document.body.append(div)
createRoot(div).render(<App />)
