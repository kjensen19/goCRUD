import GetTask from "@/pages/getTask";

export default async function Page() {
  var task = []
  task = GetTask()
  console.log('?', task)
  // function handleClick(){
  //   task = GetTask()
  //   console.log(task)
  //   return task
  // }

  return(
    <>
      <h1>Is it working?</h1>
      <button>ttt</button>
      <ul>
        {task.length !== 0 && task.map((dat,i) =>(
            <li key={i}>{dat.name}</li>
          )
        )}
    </ul>
    </>
  )
}
