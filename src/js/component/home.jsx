import React, { useState, useEffect, useRef } from "react";

/* La api se suele caer. En tal caso, seguir los pasos detallados 
en la documenración con la URL usada en el presente caso - DOCUMENTACIÓN ==> https://playground.4geeks.com/apis/fake/todos */

//create your first component
const Home = () => {
  const [todoList, setTodoList] = useState([]);
  const [alert, setAlert] = useState(false);
  const [alert2, setAlert2] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    const response = await fetch(
      "https://playground.4geeks.com/apis/fake/todos/user/MiguelSEO10"
    );
    const data = await response.json();
    setTodoList(data);
  };

  const addTodo = async (NewTodo) => {
    const response = await fetch(
      "https://playground.4geeks.com/apis/fake/todos/user/MiguelSEO10",
      {
        method: "PUT",
        body: JSON.stringify([...todoList, { label: NewTodo, done: false }]),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      setTodoList([...todoList, { label: NewTodo, done: false }]);
    } else {
      console.error("Error al agregar la tarea:", response.statusText);
    }
  };

  const deleteTodo = async (index) => {
    let updatedTodos = [...todoList];

    if (updatedTodos.length === 1) {
      // Si hay una sola tarea
      updatedTodos[0].label = "example task";
    } else {
      // Si hay más de una tarea o la última tarea no es la única, filtra la tarea correspondiente
      updatedTodos = updatedTodos.filter((e, i) => i !== index);
    }

    const response = await fetch(
      "https://playground.4geeks.com/apis/fake/todos/user/MiguelSEO10",
      {
        method: "PUT",
        body: JSON.stringify(updatedTodos),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    setTodoList(updatedTodos);
  };

  const deleteAllTodos = async () => {
    const response = await fetch(
      "https://playground.4geeks.com/apis/fake/todos/user/MiguelSEO10",
      {
        method: "PUT",
        body: JSON.stringify([{ done: false, label: "example task" }]),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setTodoList([]);
  };

  return (
    <section className="Fondo">
      <div className=" container text-center">
        <h1 className="Encabezado text-center">Lista de Tareas</h1>

        <div className="row d-flex justify-content-center ">
          <div className="col-lg-5 col-lg-5 col-sm-10">
            <div>
              {alert ? (
                <p className="alert text-primary">
                  {" "}
                  Por Favor, no ingrese campos Vacíos
                </p>
              ) : null}
              {alert2 ? (
                <p className="alert text-primary">
                  {" "}
                  Por Favor, no ingrese Tareas Repetidas
                </p>
              ) : null}
            </div>
            <input
              ref={inputRef}
              onKeyUp={(e) => {
                const isRepeat = todoList.some(
                  (todo) => todo.label === e.target.value.trim()
                );
                console.log(e.target.value.trim());
                if (
                  e.key == "Enter" &&
                  e.target.value.trim() != "" &&
                  !isRepeat
                ) {
                  addTodo(e.target.value);
                  e.target.value = "";
                  setAlert(false);
                  setAlert2(false);
                } else if (e.key == "Enter" && isRepeat) {
                  setAlert2(true);
                  setAlert(false);
                } else if (e.key == "Enter" && e.target.value == "") {
                  setAlert(true);
                  setAlert2(false);
                }
              }}
              type="text"
              className=" border-0 text-center form-control p-3"
              id="todoList"
              placeholder="Agregar Tareas"
            />
            {todoList.map((todo, index) => {
              if (todo.label !== "example task") {
                const adjustedIndex = todoList.some(
                  (task) => task.label === "example task"
                )
                  ? index
                  : index + 1;
                return (
                  <div key={index} className="mostrar todoList border">
                    <p className="pt-3 d-flex justify-content-evenly text-dark">
                      {`Tarea ${adjustedIndex}: ${todo.label}`}
                      <i
                        className="ocultar text-primary fa-solid fa-trash"
                        onClick={() => {
                          deleteTodo(index);
                        }}
                      ></i>
                    </p>
                  </div>
                );
              }
            })}

            <div className="letraFinal todoList p-3 text-secondary">
              {(() => {
                const exampleTaskIndex = todoList.findIndex(
                  (todo) => todo.label === "example task"
                );
                if (exampleTaskIndex === -1) {
                  if (todoList.length === 1) {
                    return `Tienes ${todoList.length} Tarea por hacer`;
                  } else if (todoList.length > 1) {
                    return `Tienes ${todoList.length} Tareas por hacer`;
                  } else {
                    return "¡Bien, Tiempo Libre!";
                  }
                } else {
                  if (todoList.length === 2) {
                    return `Tienes ${todoList.length - 1} Tarea por hacer`;
                  } else if (todoList.length > 2) {
                    return `Tienes ${todoList.length - 1} Tareas por hacer`;
                  } else {
                    return "¡Bien, Tiempo Libre!";
                  }
                }
              })()}
            </div>
            <div className=" todoList pliegue border mx-1"></div>
            <div className="todoList pliegue border mx-2"></div>
            <button
              className="btn btn-success mt-3 mx-2"
              onClick={async () => {
                const newTodoValue = inputRef.current.value.trim();
                const isDuplicate = todoList
                  .map((todo) => todo.label)
                  .includes(newTodoValue);

                if (newTodoValue !== "" && !isDuplicate) {
                  await addTodo(newTodoValue);
                  inputRef.current.value = "";
                  setAlert(false);
                  setAlert2(false);
                } else if (newTodoValue === "") {
                  setAlert(true);
                  setAlert2(false);
                } else {
                  setAlert(false);
                  setAlert2(true);
                }
              }}
            >
              Añadir tarea
            </button>
            <button
              className="btn btn-danger mt-3 mx-2"
              onClick={() => {
                deleteAllTodos();
                setAlert(false);
                setAlert2(false);
              }}
            >
              Eliminar Tareas
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
