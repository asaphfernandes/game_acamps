import React, { Suspense } from 'react';
import Container from './container';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import CompetirView from './competir';
import ResultadoView from './resultado';
import EquipeView from './equipe';
import ProvaView from './prova';
import CompetirEquipeView from './competir/equipe';
import CompetirCronometroView from './competir/cronometro';
import ManutencaoView from './manutencao';
import ResultadoGerenciarView from './manutencao/gerenciar';
import CompetirScoreView from './competir/score';

const HomeView: React.FC = () => {
  const opcoes = ["Resultado", "Prova", "Equipe", "Manutencao"];
  return (<Container>
    <ul style={{ listStyle: "none", width: 248 }}>
      <li style={{ width: 248, textAlign: "center", fontSize: 48, marginBottom: 25, background: '#546E7A', border: "1px solid #546E7A", borderRadius: 5 }}>
        <Link to='/competir' style={{ textDecoration: "none", color: "white", }}>
          Competir
        </Link>
      </li>
      {opcoes.map(opcao => {
        return (<li key={opcao} style={{ width: 248, textAlign: "center", fontSize: 32, marginBottom: 25, background: "white", border: "1px solid #546E7A", borderRadius: 5 }}>
          <Link to={`/${opcao}`} style={{ textDecoration: "none", color: "#546E7A", width: "100%" }}>
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
        <Route exact path='/competir/score' component={CompetirScoreView} />
        <Route exact path='/resultado' component={ResultadoView} />
        <Route exact path='/equipe' component={EquipeView} />
        <Route exact path='/prova' component={ProvaView} />
        <Route exact path='/manutencao' component={ManutencaoView} />
        <Route exact path='/manutencao/gerenciar/:nome' component={ResultadoGerenciarView} />
      </Switch>
    </Suspense>

  </BrowserRouter>);
}

export default App;
