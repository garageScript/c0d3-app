const actionList = []
const initial = [
  { title: 'To-Do', color: '#35235D', todos: [] },
  { title: 'Doing', color: '#CB2402', todos: [] },
  { title: 'Done', color: '#4C49A2', todos: [] },
  { title: 'Approved', color: '#A31A48', todos: [] }
]

const renderCard = id => {
  const item = data[id]
  const container = document.querySelectorAll('.todoListContainer')[id]

  // Rendering UI
  const right = id == data.length - 1 ? '' : '&gt;'
  const left = id == 0 ? '' : '&lt;'
  const todos = item.todos.reduce((acc, todo, i) => {
    return (
      acc +
      `
      <div class="todoContainer">
        <div class="swap left clickable" data-id="${id}" data-index="${i}">${left}</div>
        <div class="center clickable" data-id="${id}" data-index="${i}">${todo}</div>
        <div class="swap right clickable" data-id="${id}" data-index="${i}">${right}</div>
      </div>
    `
    )
  }, '')
  container.innerHTML = `
    <div class="title" style="background: ${item.color}">${item.title}</div>
    ${todos}
    <div class="inputContainer">
      <textarea name="" rows="5" id="input-${id}"></textarea>
      <button data-id="${id}" class="submit">Submit</button>
    </div>
  `

  container.onclick = e => {
    const targetClass = e.target.classList
    if (!targetClass.contains('clickable') && !targetClass.contains('submit'))
      return
    const listId = +e.target.dataset.id

    // Adding Item
    if (targetClass.contains('submit')) {
      const element = document.querySelector(`#input-${listId}`)
      const value = element.value
      if (!value.length) return
      const newId = takeAction('add', { listId, value })
      actionList.push({ action: 'delete', info: { listId, todoId: newId - 1 } })
      element.value = ''
    }

    const todoId = +e.target.dataset.index
    // Removing Item
    if (targetClass.contains('center')) {
      if (
        !confirm(
          `Are you sure you want to remove ${data[listId].todos[todoId]}?`
        )
      )
        return
      actionList.push({
        action: 'add',
        info: {
          value: takeAction('delete', { todoId, listId }),
          listId
        }
      })
    }

    // Swaping Item
    if (targetClass.contains('swap')) {
      const newIndex = targetClass.contains('left') ? listId - 1 : listId + 1
      const newId = takeAction('swap', {
        listId,
        todoId,
        newIndex,
        newId: data[newIndex].todos.length
      })
      actionList.push({
        action: 'swap',
        info: {
          listId: newIndex,
          todoId: newId,
          newIndex: listId,
          newId: todoId
        }
      })
    }
  }
}

const localData = localStorage.getItem('kanban')
const data = localData && localData.length > 5 ? JSON.parse(localData) : initial
data.forEach((d, i) => renderCard(i))

undo.onclick = () => {
  const todo = actionList.pop()
  console.log('todo', todo)
  if (!todo) return
  takeAction(todo.action, todo.info)
  localStorage.setItem('kanban', JSON.stringify(data))
}

const takeAction = (action, info) => {
  const selectedList = data[info.listId].todos
  let result = ''
  switch (action) {
    case 'add':
      result = selectedList.push(info.value)
      break
    case 'delete':
      result = selectedList.splice(info.todoId, 1)
      break
    case 'swap':
      const oldItem = selectedList.splice(info.todoId, 1)
      const listB = data[info.newIndex].todos
      listB.splice(info.newId, 0, oldItem)
      result = listB.length - 1
      renderCard(info.newIndex)
      break
  }
  renderCard(info.listId)
  localStorage.setItem('kanban', JSON.stringify(data))
  return result
}
