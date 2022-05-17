import React, { Suspense } from 'react';
import Container from './container';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import CompetirView from './competir';
import ResultadoView from './resultado';
import EquipeView from './equipe';
import ProvaView from './prova';

const HomeView: React.FC = () => {
  return (<Container>
    <ul>
      <li><Link to='/competir'>Competir</Link></li>
      <li><Link to='/resultado'>Resultado</Link></li>
      <li><Link to='/equipe'>Equipes</Link></li>
      <li><Link to='/prova'>Provas</Link></li>
    </ul>
  </Container>);
};

const App: React.FC = () => {
  return (<BrowserRouter>
    <Suspense fallback={<>Carregando</>} >
      <Switch>
        <Route exact path='/' component={HomeView} />
        <Route exact path='/competir' component={CompetirView} />
        <Route exact path='/resultado' component={ResultadoView} />
        <Route exact path='/equipe' component={EquipeView} />
        <Route exact path='/prova' component={ProvaView} />
      </Switch>
    </Suspense>

  </BrowserRouter>);
}

export default App;
