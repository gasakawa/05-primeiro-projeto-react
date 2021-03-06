import React, { useState, useEffect, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
import * as S from './styles';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem('@GithubExplorer:repositories');
    if (storagedRepositories) {
      return JSON.parse(storagedRepositories);
    }
    return [];
  });
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');

  useEffect(() => {
    localStorage.setItem('@GithubExplorer:repositories', JSON.stringify(repositories));
  }, [repositories]);

  const handleAddRepository = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    if (!newRepo) {
      setInputError('Digite o autor/nome do repositório');
      return;
    }

    try {
      const response = await api.get<Repository>(`/repos/${newRepo}`);
      const repository = response.data;
      setRepositories([...repositories, repository]);
      setNewRepo('');
      setInputError('');
    } catch (err) {
      setInputError('Erro na busca por esse repositório');
    }
  };
  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <S.Title>Explore repositórios no Github</S.Title>

      <S.Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          type="text"
          name="repository"
          id="repository"
          placeholder="Digite o nome do repositório"
          value={newRepo}
          onChange={e => {
            setNewRepo(e.target.value);
          }}
        />
        <button type="submit">Pesquisar</button>
      </S.Form>

      {inputError && <S.InputError>{inputError}</S.InputError>}

      <S.Repositories>
        {repositories.map(repository => (
          <Link to={`/repository/${repository.full_name}`} key={repository.full_name}>
            <img src={repository.owner.avatar_url} alt={repository.owner.login} />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight size={20} />
          </Link>
        ))}
      </S.Repositories>
    </>
  );
};

export default Dashboard;
