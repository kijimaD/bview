import reactLogo from './assets/react.svg';
import './App.css';
import { CrawlerCanvas } from './components/CrawlerCanvas';

function App() {
  return (
      <>
          <div>
              <a href="https://react.dev" target="_blank">
                  <img src={reactLogo} className="logo react" alt="React logo" />
              </a>
          </div>
          <p>
              ↓
              <CrawlerCanvas />
          </p>
      </>
  )
}

export default App
