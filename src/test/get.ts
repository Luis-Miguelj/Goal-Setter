async function get() {
  try {
    const response = await fetch('http://localhost:3333/users', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()

    return data
  } catch (err) {
    console.error('Erro ao executar a requisisão:', new Error(err as string))
  }
}

get()
  .then(data => {
    console.log(data)
  })
  .catch(err => {
    console.log(err)
  })
