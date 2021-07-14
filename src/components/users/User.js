import React, { Fragment, useEffect, useContext } from 'react';
import {Link} from 'react-router-dom';
import Repos from '../repos/Repos';
import GithubContext from '../../context/github/githubContext';

const  User = ({ match}) => {
    const githubContext = useContext(GithubContext);
    const { getUser, user, loading, repos, getUserRepos } = githubContext;
    
    useEffect(() => {
        getUser(match.params.login);
        getUserRepos(match.params.login);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const { 
        name,
        company, blog,
        avatar_url,
        location,
        bio,
        login,
        html_url,
        followers,
        following,
        public_repos,
        public_gists,
        hireable    
    } = user;

        if (loading) return <h2>Loading...</h2>;

        return (
            <>
                <Link to='/' className='btn btn-light'>Back to Search</Link>
                Hireable: {' '}
                {hireable ? <i className='fa fa-check text-success' /> : 
                    <i className='fa fa-times-circle text-danger' />}
                <div className="card grid-2">
                    <div className="all-center">
                        <img src={avatar_url} className="round-img" alt="" />
                        <h1>{name}</h1>
                        <p>Location: {location}</p>
                    </div>
                    <div>
                        {bio && (<Fragment>
                            <h3>Bio</h3>
                            <p>{bio}</p>
                        </Fragment>)
                        }
                        <a href={html_url} className='btn btn-dark my-1'>Vist GitHub Profile</a>
                        <ul>
                            <li key={login}>{login && <Fragment>
                                <strong>Username: </strong> {login}
                            </Fragment>}</li>
                            <li key={company}>{company && <Fragment>
                                <strong>Company: </strong> {company}
                            </Fragment>}</li>
                            <li key={blog}>{blog && <Fragment>
                                <strong>Blog: </strong> {blog}
                            </Fragment>}</li>
                        </ul>
                    </div>
                </div>
                <div className="card text-center">
                    <div className="badge badge-light">Followers: {followers}</div>
                    <div className="badge badge-success">Following: {following}</div>
                    <div className="badge badge-danger">Public repos: {public_repos}</div>
                    <div className="badge badge-dark">Public gists: {public_gists}</div>
                </div>

                <Repos repos={repos} />
            </>
        )
    
}


export default User
