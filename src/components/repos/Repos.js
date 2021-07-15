import React, { useContext } from 'react';
import RepoItem from './RepoItem';
import GithubContext from '../../context/github/githubContext';

export default function Repos() {
    const githubContext = useContext(GithubContext);
    const { repos } = githubContext;
    return repos.map( repo => <RepoItem key={repo.id} repo={repo}  />)
}


