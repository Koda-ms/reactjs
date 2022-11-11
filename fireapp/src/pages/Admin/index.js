import { useEffect, useState } from 'react';
import { auth, db } from '../../firebaseConnection';
import { signOut } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, orderBy, query, updateDoc, where } from 'firebase/firestore';
import './admin.css';

function Admin(){
    const[task, setTask] = useState('');
    const[taskList, setTaskList] = useState([]);
    const[user, setUser] = useState({});
    const[editTask, setEditTask] = useState({});

    useEffect(() => {
        async function loadTasks(){
            const userDetail = localStorage.getItem("@userDetail");
            setUser(JSON.parse(userDetail));

            if(userDetail){
                const data = JSON.parse(userDetail);
                const taskRef = collection(db, "tasks");
                //THE QUERY IS USED TO A BETTER SEARCH. IT CAN BE ORDERED asc OR desc BY orderBy 
                //AND IT CAN USE THE where STATE TO COMPARE WITH SOMETHING
                const q = query(taskRef, orderBy("created", "desc"), where("userUid", "==", data?.uid));

                //onSnapshot WORKS WITH THE REAL TIME REQUESTING ON THE BANK
                const unsub = onSnapshot(q, (snapshot) => {
                    let list = [];
                    snapshot.forEach((doc) => {
                        //THE push IS TO PUT INSIDE THE LIST
                        list.push({
                            task: doc.data().task,
                            created: doc.data().created,
                            id: doc.id
                        })
                    })
                    setTaskList(list);
                })
            }
        }

        loadTasks();
    }, []);

    async function handleAddTask(e){
        e.preventDefault();

        if(task === ''){
            alert("Please, type a task.");
        }

        //IF THERE IS ANY TASK TO BE EDITTED (THAT'S WHY THE CODITION GOT AN id)
        //THE TASK WILL BE UPDATE BY THE FUNCTION
        if(editTask?.id){
            handleUpdate();
            return;
        }

        await addDoc(collection(db, "tasks"), {
            task: task,
            created: new Date(),
            userUid: user?.uid, //THE ? IS USED CUZ TEH USER const MIGHT BE EMPTY
        })
        .then(() => {
            setTask('');
        })
        .catch((error) => {
            alert("An error occured: " + error);
        })
    }

    function handleEdit(taskToEdit){
        setTask(taskToEdit.task);
        setEditTask(taskToEdit);
    }

    async function handleUpdate(){
        const taskRef = doc(db, "tasks", editTask?.id);
        await updateDoc(taskRef, {
            task: task
        })
        .then(() => {
            console.log("Task updated");
            setEditTask({});
            setTask('');
        })
        .catch((error) => {
            console.log("The task cound not be updated: " + error);
        })
    }

    async function handleRemove(id){
        const taskRef = doc(db, "tasks", id);
        await deleteDoc(taskRef);
    }    

    async function handleLogout(){
        await signOut(auth);
    }

    return(
        <div className='adm-container'>
            <h1>My tasks</h1>
            <form className='form' onSubmit={handleAddTask}>
                <textarea placeholder='Type your task' value={task} 
                    onChange={(e) => setTask(e.target.value)}/>
                
                {/*THIS GOES TO THE CASE WE HAVE AN EDITION TO BE DONE (length > 0), SO THE BUTTON CHANGES */}
                {Object.keys(editTask).length > 0 ? (
                    <button className='btn-add' style={{backgroundColor: "#6add39"}}>Update Task</button>
                ) : (
                    <button type='submit' className='btn-add'>Add Task</button>
                )}
            </form>
            
            {taskList.map((task) => (
                <article className='task-list' key={task.id}>
                    <p>{task.task}</p>
                    <div>
                        <button onClick={() => handleEdit(task)}>Edit</button>
                        <button className='btn-remove' onClick={() => handleRemove(task.id)}>Done</button>
                    </div>
                </article> 
            ))}
            
            <button className='btn-logout' onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Admin;