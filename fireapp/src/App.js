import { useEffect, useState } from 'react';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from './firebaseConnection';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

function App(){
  const[titulo, setTitulo] = useState('');
  const[autor, setAutor] = useState('');
  const[postsList, setPostsList] = useState([]); 
  const[postId, setPostId] = useState('');

  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');

  const[user, setUser] = useState(false);
  const[userDetail, setUserDetail] = useState([]);

  //A BETTER WAY TO UPDATE THE LIST ON TIME, BUT ONLY IN SOME CASES THE 'ON TIME UPDATING' IS NEEDED
  useEffect(() => {
    async function loadApp() {
      const dataRef = onSnapshot(collection(db, "posts"), (snapshot) => {
        let listPosts = [];

        snapshot.forEach((doc) => {
          listPosts.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor,
          })
        })
        setPostsList(listPosts);
      })
    }
    loadApp();
  }, []);

  async function handleAdd() {
    //'setDoc' IS USED TO SET MANUALLY THE DATA
    // await setDoc(doc(db, "posts", "3"), {
    //   titulo: titulo,
    //   autor: autor
    // })
    // .then(() =>{
    //   alert('Cadastro com sucesso');
    //   setTitulo('');
    //   setAutor('');
    // })
    // .catch((error) => {
    //   alert('Aconteceu um erro: ' + error);
    // })

    //'addDoc' IS USED TO ADD THE DATA DYNAMICALLY
    await addDoc(collection(db, "posts"),{
      titulo: titulo,
      autor: autor
    })
    .then(() => {
      alert('Cadastro com sucesso');
      setTitulo('');
      setAutor('');
    })
    .catch((error) => {
      alert('Aconteceu um erro: ' + error);
    })
  }

  async function handleSearch() {
    //THIS ABOVE IS A WA TO SEARCH ONLY ONE SPECIFIC USER
    // const post = doc(db, "posts", "3");
    // await getDoc(post)
    // .then((snapshot) => {
    //   setTitulo(snapshot.data().titulo);
    //   setAutor(snapshot.data().autor);
    // })
    // .catch(() => {
    //   alert('Erro ao buscar');
    //   setTitulo('');
    //   setAutor('');
    // })
    
    //THIS ONE WA HERE IS TO SEARCH AND RETURN A LIST OF posts
    const postsRef = collection(db, "posts");

    await getDocs(postsRef)
    .then((snapshot) => {
      let list = [];

      snapshot.forEach((doc) => {
        list.push({
          id: doc.id,
          titulo: doc.data().titulo,
          autor: doc.data().autor,
        })
      })
      setPostsList(list);
    })
    .catch((error) => {
      alert('Erro ao buscar');
    })
  }

  async function handleDelete(id) {
    const userRef = doc(db, "posts", id);

    await deleteDoc(userRef)
    .then(() => {
      alert('Usuário removido com sucesso.');
    })
  }

  async function handleUpdate(){
    const postRef = doc(db, "posts", postId);

    await updateDoc(postRef, {
      titulo: titulo,
      autor: autor
    })
    .then(() => {
      alert('Cadastro atualizado!');
      setPostId('');
      setTitulo('');
      setAutor('');
    })
    .catch((error) => {
      alert('Ocorreu um erro ao atualizar: '+error);
    })
  }

  async function handleSignUp() {
    await createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert('Usuário cadastrado!');
      setEmail('');
      setPassword('');
    })
    .catch((error) => {
      if(error.code === 'auth/weak-password'){
        alert('Senha fraca. Tente novamente');
      } else if(error.code === 'auth/email-already-in-use'){
        alert('O email digitado já existe.');
      }
    })
  }

  async function handleLogin() {
    await signInWithEmailAndPassword(auth, email, password)
    .then((value) => {
      alert('Usuário logado');
      setEmail('');
      setPassword('');
      setUserDetail({
        uid: value.user.uid,
        email: value.user.email,
      })
      setUser(true);
    })
    .catch(() => {
      alert('Erro ao fazer login');
    })
  }

  return(
    <div>
      <h1>Cadastrar Usuário</h1>
      {user === true && 
        <div>
          <strong>Seja bem-vindo(a)! Você está logado(a)</strong><br/>
          <span>ID: {userDetail.uid} - Email: {userDetail.email}</span>
          <br/><br/>
        </div>  
      }
      <div>
        <input type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/><br/>
        <input type='password' placeholder='Senha' value={password} onChange={(e) => setPassword(e.target.value)}/><br/>
        <button onClick={handleSignUp}>Cadastrar</button>
        <button onClick={handleLogin}>Login</button>
      </div>

      <hr/>

      <h1>Registrar Post</h1>
      <div>
        <label>Post</label><br/>
        <input type='text' placeholder='Id do post' value={postId} onChange={(e) => setPostId(e.target.value)}/><br/>
        <input type='text' placeholder='Título' value={titulo} onChange={(e) => setTitulo(e.target.value)}/><br/>
        <input type='text' placeholder='Autor' value={autor} onChange={(e) => setAutor(e.target.value)}/><br/>
        <button onClick={handleAdd}>Cadastrar Post</button><br/>
        <button onClick={handleSearch}>Buscar Post</button><br/>
        <button onClick={handleUpdate}>Atualizar Post</button>
      </div>

      <ul>
        {postsList.map((post) => {
          return(
            <li key={post.id}>
              <strong>ID: {post.id}</strong><br/>
              <span>Nome: {post.titulo}</span><br/>
              <span>Idade: {post.autor}</span>
              <button onClick={() => handleDelete(post.id)}>Excluir</button>
            </li>
          );
        })}
      </ul>
    </div>
  )
}

export default App;