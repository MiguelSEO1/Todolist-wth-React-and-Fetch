import React, {useState, useEffect} from "react";


//create your first component
const Home = () => {

	const [todoList, setTodoList] = useState([]);

//Peticiones FETCH	

	useEffect(() => {
		getTodos()
		
	},[]);

	const getTodos = async () => {
       	
		const response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/miguelseo");
		const data = await response.json();
		setTodoList(data);
	  };

	const addTodo = async (todo) => {
		
		const updatedTodos1 = [...todoList, { label: todo, done: false }];
		const response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/miguelseo", {
		  method: "PUT",
		  body: JSON.stringify(updatedTodos1),
		  headers: {
			"Content-Type": "application/json"
		  }
		});
		
		const data = await response.json();
		setTodoList([...todoList, {label: todo, done: false }]);
	  };
	
	const deleteTodo = async (index) => {
		
		const updatedTodos2 = todoList.filter((t, i) => i !== index);
		const response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/miguelseo", {
		  method: "PUT",
		  body: JSON.stringify(updatedTodos2),
		  headers: {
			"Content-Type": "application/json"
		  }
		});
		
		const data = await response.json();
		setTodoList(updatedTodos2);
	  };

    const clearTodos = async () => {
	    await fetch("https://assets.breatheco.de/apis/fake/todos/user/miguelseo", {
	    method: "PUT",
	    body: JSON.stringify([{label: "Pepito", done: false}]),
	    headers: {
		"Content-Type": "application/json"
	  }
	    });
	    setTodoList([]);
        };
  
//Lógica de los componentes
	
    return (
		<div className="text-center m-5">
		<div className="container">
			<div className=" row">
								
				<div className=" col-4 m-auto">
			          
					  <input className=" form-control text-center " placeholder="Add Todo" 
					   onKeyUp={(e) => {
						if(e.key === "Enter" &&
						e.target.value.trim() !== "" &&
						!todoList.some(todo => todo.label === e.target.value.trim())){
							addTodo(e.target.value)
							e.target.value = "";
						} }}/>{
						todoList.map((todo, index) => {
							if(todo.label !== "Pepito"){
								return <div key={index} className=" mostrar row alert border">	  
								<p className=" col-8 d-flex justify-content-start">{todo.label}</p>
								<p className=" ocultar offset-2 col-2" onClick={() => {
									deleteTodo(index)
								}}><i className="fa-solid fa-trash"></i></p>
						  </div>
							}
							
						
					})}

				<div className="row p-3 border">{todoList.length > 1 ? `${todoList.length - 1} todos`:"no hay tareas"}</div>
				<button onClick={clearTodos}>Clear All</button>

			    </div>
			</div>
		</div>    
		</div>
	);
};

export default Home;
