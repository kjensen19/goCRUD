

    const task = async () => {
        try { 
            const res = await fetch(`http://localhost:8080/tasks`);
            const data = await res.json();
            console.log('data?', data);
            return data
        } catch (err) {
            console.log(err);
        }
       
    };


export default async function GetTask() {
   const tasks = await task()
   return tasks
}