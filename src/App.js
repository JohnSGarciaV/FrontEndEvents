import './App.css';
import Calendario from './pages/Calendario';
import Evento from './pages/Evento';
import { BrowserRouter as Router, Switch, Route, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Router>
          <Route path={['/', '/evento']} exact>
            <Switch>
              <Route path={'/'} exact component={Calendario}>
              </Route>

              <Route path={'/evento'} exact>
                <Evento />
              </Route>

            </Switch>
          </Route>

        </Router>
      </BrowserRouter>
    </div>
  );
}

export default App;
