import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';
import * as S from './styles';

const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <S.Title>Explore repositórios no Github</S.Title>

      <S.Form>
        <input type="text" name="repository" id="repository" placeholder="Digite o nome do repositório" />
        <button type="submit">Pesquisar</button>
      </S.Form>

      <S.Repositories>
        <a href="teste">
          <img
            src="https://avatars3.githubusercontent.com/u/11186263?s=460&u=52751f63f72a291531c9b139eac12b2e9ed7719f&v=4"
            alt="Gabriel Asakawa"
          />
          <div>
            <strong>gasakawa/teste</strong>
            <p>Teste</p>
          </div>

          <FiChevronRight size={20} />
        </a>
      </S.Repositories>
    </>
  );
};

export default Dashboard;
