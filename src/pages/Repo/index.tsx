import React from 'react';
import {useRouteMatch} from 'react-router-dom';
import {Header, RepoInfo, Issues} from './styles';
import {Link} from 'react-router-dom';
import Logo from '../../assets/logo.svg';
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi';
import {api} from '../../services/api';

interface ReposiParms{
  repository: string;
}

interface GithubRepository{
  full_name: string;
  description: string;
  forks_count: number;
  open_issues_count: number;
  stargazers_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}
interface GithutIssues{
    id: number;
    title: string;
    html_url: string;
    user: {
      login: string;
    }
  }

 export const Repo: React.FC = () => {

  //Recebendo dados API sem usar algum formulario
   const [repository,setRepository] = React.useState<GithubRepository | null>(null)
   const [issues,setIssues] = React.useState<GithutIssues[]>([])
  const {params} = useRouteMatch<ReposiParms>();

  React.useEffect(() => {
    api
    .get(`repos/${params.repository}`)
    .then(response => setRepository(response.data))

    api
    .get(`repos/${params.repository}/issues`)
    .then(response => setIssues(response.data))
  }, [params.repository]);



  //---------------------------------------------


  return (
    <>
     <Header>
       <img src={Logo} alt="Git" />
       <Link to="/">
         <FiChevronLeft/>
         Voltar
         </Link>
     </Header>

     
     {repository && (
       <RepoInfo>
       <header>
         <img src={repository.owner.avatar_url} alt={repository.owner.login} />
         <div>
           <strong>{repository.full_name}</strong>
           <p>{repository.description}</p>
         </div>
       </header>
       <ul>
         <li>
           <strong>{repository.stargazers_count}</strong>
           <span>Stars</span>
         </li>
         <li>
          <strong>{repository.forks_count}</strong>
           <span>Forks</span>
         </li>
         <li>
         <strong>{repository.open_issues_count}</strong>
          <span>Issues abertas</span>
         </li>
       </ul>

     </RepoInfo>

     )}
     <Issues>
       {issues.map(issue =>(
         <a href={issue.html_url} key={issue.id}>
         <div>
           <strong>{issue.title}</strong>
           <p>{issue.user.login}</p>
         </div>

         <FiChevronRight size={20}/>
       </a>
       ))}
     </Issues>
    </>

  );
};


