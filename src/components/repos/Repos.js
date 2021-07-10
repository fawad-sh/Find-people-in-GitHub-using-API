import React from 'react';
import PropTypes from 'prop-types';
import RepoItem from './RepoItem';


export default function Repos({repos}) {

    return repos.map( repo => <RepoItem repo={repo}  key={repos.id} />)
}

Repos.propTypes = {
    repos: PropTypes.array.isRequired,
}
