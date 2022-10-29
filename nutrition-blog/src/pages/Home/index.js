import React, { useEffect, useState } from 'react';
import './style.css';

//USING THE HOOKS' API ELEMENTS
//HTTP REQUEST
//https://sujeitoprogramador.com/rn-api/?api=posts

function Home(){

  const[articles, setArticles] = useState([]);

  //TO MOUNT THE ARTICLES ON THE SCREEN EXACTLY WHE IT LOADS
  //IT CAN BE USE THE useEffect()
  useEffect(() => {

    function loadApi(){
      let url = 'https://sujeitoprogramador.com/rn-api/?api=posts';

      //THE fetch IS A RESOURCE USED TO MAKE A REQUEST AND 
      //TAKE THE DATA THE URL KEEPS
      fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setArticles(json);
      });
    }

    loadApi();
  }, []);

  return(
    <div className='container'>

      {articles.map((item) => {
        return(
          <article key={item.id} className='post'>
            <strong className='title'>{item.titulo}</strong>
            <img src={item.capa} alt='' className='cover'/>
            <p className='subtitle'>{item.subtitulo}</p>
            <a type='button' className='btn'>Acessar</a>
          </article>
        );
      })}
    </div>
  );
}

export default Home;