import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from './firebaseConnection';

function App(){
  const[name, setName] = useState('');
  const[age, setAge] = useState('');
  const[usersList, setUsersList] = useState([]); 
  const[userId, setUserId] = useState('');

  //A BETTER WAY TO UPDATE THE LIST ON TIME, BUT ONLY IN SOME CASES THE 'ON TIME UPDATING' IS NEEDED
  useEffect(() => {
    async function loadApp() {
      const dataRef = onSnapshot(collection(db, "users"), (snapshot) => {
        let listUsers = [];

        snapshot.forEach((doc) => {
          listUsers.push({
            id: doc.id,
            name: doc.data().name,
            age: doc.data().age,
          })
        })
        setUsersList(listUsers);
      })
    }
    loadApp();
  }, []);

  async function handleAdd() {
    //'setDoc' IS USED TO SET MANUALLY THE DATA
    // await setDoc(doc(db, "users", "3"), {
    //   name: name,
    //   age: age
    // })
    // .then(() =>{
    //   alert('Cadastro com sucesso');
    //   setName('');
    //   setAge('');
    // })
    // .catch((error) => {
    //   alert('Aconteceu um erro: ' + error);
    // })

    //'addDoc' IS USED TO ADD THE DATA DYNAMICALLY
    await addDoc(collection(db, "users"),{
      name: name,
      age: age
    })
    .then(() => {
      alert('Cadastro com sucesso');
      setName('');
      setAge('');
    })
    .catch((error) => {
      alert('Aconteceu um erro: ' + error);
    })
  }

  async function handleSearch() {
    //THIS ABOVE IS A WA TO SEARCH ONLY ONE SPECIFIC USER
    // const user = doc(db, "users", "3");
    // await getDoc(user)
    // .then((snapshot) => {
    //   setName(snapshot.data().name);
    //   setAge(snapshot.data().age);
    // })
    // .catch(() => {
    //   alert('Erro ao buscar');
    //   setName('');
    //   setAge('');
    // })
    
    //THIS ONE WA HERE IS TO SEARCH AND RETURN A LIST OF USERS
    const usersRef = collection(db, "users");

    await getDocs(usersRef)
    .then((snapshot) => {
      let list = [];

      snapshot.forEach((doc) => {
        list.push({
          id: doc.id,
          name: doc.data().name,
          age: doc.data().age,
        })
      })
      setUsersList(list);
    })
    .catch((error) => {
      alert('Erro ao buscar');
    })
  }

  async function handleDelete(id) {
    const userRef = doc(db, "users", id);

    await deleteDoc(userRef)
    .then(() => {
      alert('Usuário removido com sucesso.');
    })
  }

  async function handleUpdate(){
    const userRef = doc(db, "users", userId);

    await updateDoc(userRef, {
      name: name,
      age: age
    })
    .then(() => {
      alert('Cadastro atualizado!');
      setUserId('');
      setName('');
      setAge('');
    })
    .catch((error) => {
      alert('Ocorreu um erro ao atualizar: '+error);
    })
  }

  return(
    <div>
      <h1>Cadastrar Usuário</h1>
      <div>
        <label>User</label><br/>
        <input type='text' placeholder='Id do usuário' value={userId} onChange={(e) => setUserId(e.target.value)}/><br/>
        <input type='text' placeholder='Nome' value={name} onChange={(e) => setName(e.target.value)}/><br/>
        <input type='text' placeholder='Idade' value={age} onChange={(e) => setAge(e.target.value)}/><br/>
        <button onClick={handleAdd}>Cadastrar</button><br/>
        <button onClick={handleSearch}>Buscar Usuário</button><br/>
        <button onClick={handleUpdate}>Atualizar Usuário</button>
      </div>

      <ul>
        {usersList.map((user) => {
          return(
            <li key={user.id}>
              <strong>ID: {user.id}</strong><br/>
              <span>Nome: {user.name}</span><br/>
              <span>Idade: {user.age}</span>
              <button onClick={() => handleDelete(user.id)}>Excluir</button>
            </li>
          );
        })}
      </ul>
    </div>
  )
}

export default App;