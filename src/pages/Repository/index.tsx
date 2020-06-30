import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import api from '../../services/api';
import logoImg from '../../assets/logo.svg';
import * as S from './styles';

interface RepositoryParams {
  repository: string;
}

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
}

interface Issue {
  id: number;
  title: string;
  user: {
    login: string;
  };
  html_url: string;
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();
  const [repository, setRepository] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    api.get(`/repos/${params.repository}`).then(response => {
      setRepository(response.data);
    });

    api.get(`/repos/${params.repository}/issues`).then(response => {
      setIssues(response.data);
    });
  }, [params.repository]);

  return (
    <>
      <S.Header>
        <img src={logoImg} alt="Github Explorer" />
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </S.Header>

      <S.RepositoryInfo>
        <header>
          <img src={repository?.owner.avatar_url} alt="" />
          <div>
            <strong>{repository?.full_name}</strong>
            <p>{repository?.description}</p>
          </div>
        </header>
        <ul>
          <li>
            <strong>{repository?.stargazers_count}</strong>
            <span>Stars</span>
          </li>
          <li>
            <strong>{repository?.forks_count}</strong>
            <span>Forks</span>
          </li>
          <li>
            <strong>{repository?.open_issues_count}</strong>
            <span>Issues abertas</span>
          </li>
        </ul>
      </S.RepositoryInfo>

      <S.Issues>
        {issues.map(issue => (
          <a href={issue.html_url} target="_blank" rel="noopener noreferrer" key={issue.id}>
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>

            <FiChevronRight size={20} />
          </a>
        ))}
      </S.Issues>
    </>
  );
};

export default Repository;
