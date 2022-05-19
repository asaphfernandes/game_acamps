import React, { Suspense } from 'react';
import Container from './container';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import CompetirView from './competir';
import ResultadoView from './resultado';
import EquipeView from './equipe';
import ProvaView from './prova';
import CompetirEquipeView from './competir/equipe';
import CompetirCronometroView from './competir/cronometro';

const HomeView: React.FC = () => {
  const opcoes = ["Competir", "Resultado", "Equipe", "Prova"];
  return (<Container>
    <ul style={{ listStyle: "none" }}>
      {opcoes.map(opcao => {
        return (<li key={opcao} style={{ margin: 50 }}>
          <Link to={`/${opcao}`} style={{ fontSize: 18, padding: 10, textDecoration: "none", border: "1px solid red" }}>
            {opcao}
          </Link>
        </li>)
      })}
    </ul>
  </Container>);
};

const App: React.FC = () => {
  return (<BrowserRouter>
    <Suspense fallback={<>Carregando</>} >
      <Switch>
        <Route exact path='/' component={HomeView} />
        <Route exact path='/competir' component={CompetirView} />
        <Route exact path='/competir/equipe' component={CompetirEquipeView} />
        <Route exact path='/competir/cronometro' component={CompetirCronometroView} />
        <Route exact path='/resultado' component={ResultadoView} />
        <Route exact path='/equipe' component={EquipeView} />
        <Route exact path='/prova' component={ProvaView} />
      </Switch>
    </Suspense>

  </BrowserRouter>);
}

export default App;
