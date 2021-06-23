import React from 'react';
import {FiChevronRight} from 'react-icons/fi';
import {Title, Form, Repos, Error} from './styles'
import Logo from '../../assets/logo.svg';
import { api } from '../../services/api';


interface GithubRepository{
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  }
}
 export const Dashboard: React.FC = () => {
   const [repos,setRepos] = React.useState<GithubRepository[]>( () => {
     const storageRepos = localStorage.getItem('@GitCollection:repositorios'); // Criando o localStorage
     if(storageRepos){
       return JSON.parse(storageRepos);
     }
     return [];
   });
   const [newRepo, setNewRepo] = React.useState('');
   const [inputError, setInputError] = React.useState('')

   React.useEffect(() => { // Criando o local Storage useEffect
      localStorage.setItem('@GitCollection:repositorios', JSON.stringify(repos));
   }, [repos]);


   function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void{

    setNewRepo(event.target.value);

   }
  async function handleAddRepo(    // Função tratando a API DO GITHUB!
    event: React.FormEvent<HTMLFormElement>,
    ): Promise<void> {
     event.preventDefault();

     if( !newRepo) {
       setInputError('Informe o username/repositório');
       return;
     }
     const response = await api.get<GithubRepository>(`repos/${newRepo}`);

     const repository = response.data;

     setRepos([...repos, repository]);
     setNewRepo('')

   }
  return (
    <>
      <img src={Logo} alt="GitCollection" />
      <Title>Catalogo de repositórios do Github</Title>

      <Form hasError={Boolean(inputError)} onSubmit={handleAddRepo}>
        <input type="text" placeholder="username/repository_name" 
        onChange={handleInputChange}/>
        <button type="submit">Buscar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repos>

       {repos.map(repository => (
          // eslint-disable-next-line react/jsx-no-target-blank
          <a href={`https://github.com/${repository.full_name}`} target="_blank"
          key={repository.full_name}>
          <img 
          src={repository.owner.avatar_url}
          alt={repository.owner.login} />
          <div>
            <strong>{repository.full_name}</strong>
            <p>{repository.description}</p>
          </div>
          <FiChevronRight size={20}/>
        </a>
       ))}
      </Repos>
      </>

  );
};


