import React, {useEffect, useState} from 'react';
import './App.css';
import Column from "./Column";
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'
import CreateModal from "./CreateModal";

  const initialTasks = [
      {
          "description": "🌺🌹🌷",
          "priority": 10,
          "status": "todo",
          "_id": "5f90792b10f72d003c817610",
          "name": "🏝️🌳🌲",
      },
      {
          "description": "dragon",
          "priority": 4,
          "status": "review",
          "_id": "5f9123faa73590003ce4b463",
          "name": "🐲🐲🐲",
      },
  ]

function App() {


      const [tasks, setTasks] = useState(initialTasks);
      const [statuses, setStatuses] = useState(['todo', 'progress', 'review', 'done',]);
      const priorities = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const getTasks = () => {
          axios.get('http://nazarov-kanban-server.herokuapp.com/card')
              .then(res => {
                  setTasks(res.data)
              })
              .catch(err => console.log(err))
    }

    useEffect(() => {
        getTasks()
    }, [])

    const moving = (id, status, direction) => {
          const corrector = (direction === 'left') ? -1 : 1;
          const newStatus = statuses.indexOf(status) + corrector;
          axios.put(`http://nazarov-kanban-server.herokuapp.com/card/${id}`, {status: statuses[newStatus]})
              .then(res => {
                  getTasks()
              })
              .catch(err => console.log(err))
    }

    const createTask = (obj) => {
          axios.post(`http://nazarov-kanban-server.herokuapp.com/card`, {...obj})
              .then(res => {
                  getTasks()
              })
              .catch(err => console.log(err))
    }

    const [openCreateMode, setOpenCreateMode] = useState(false)

    const editTask = (id, obj) => {
        axios.patch(`http://nazarov-kanban-server.herokuapp.com/card/${id}`, {...obj})
            .then(res => {
                getTasks()
            })
            .catch(err => console.log(err))
    }

    const deleteTask = (id) => {
        axios.delete(`http://nazarov-kanban-server.herokuapp.com/card/${id}`)
            .then(res => {
                getTasks()
            })
            .catch(err => console.log(err))
    }

  return (
    <div className="container">
      <h1> Kanban Bord V4</h1>
        <button onClick={() => setOpenCreateMode(true)} type="button" className="btn btn-outline-success">Create Task</button>
        {openCreateMode &&
          <CreateModal
              openCreateMode={openCreateMode}
              setOpenCreateMode={setOpenCreateMode}
              priorities={priorities}
              statuses={statuses}
              createTask={createTask}
          />
        }
        <div className='row border border-info' >
            {statuses.map(el => <Column
                status={el}
                tasks={tasks}
                key={Math.random()}
                moving={moving}
                statuses={statuses}
                priorities={priorities}
                editTask={editTask}
                deleteTask={deleteTask}
            /> )}


      </div>
    </div>
  );
}

export default App;
