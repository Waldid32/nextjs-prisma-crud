import TaskCard from "@/components/TaskCard"

async function loadTask() {
  // obtiendo de la base de datos
  const res = await fetch('http://localhost:3000/api/task')
  const data = await res.json()
  return data

}


export default async function HomePage() {
  const tasks = await loadTask()
  return (
    <section className="container m-auto">
      <div className="grid grid-cols-3 gap-3">
        {
          tasks.map((task) => (
            <TaskCard task={task} key={task.id} />
          ))
        }
      </div>
    </section>
  )
}
