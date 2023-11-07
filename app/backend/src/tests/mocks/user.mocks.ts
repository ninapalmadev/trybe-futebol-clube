const userMock = {
  email: 'admim@admim.com',
  password: 'password',
}

const tokenMock = {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc" // Aqui deve ser o token gerado pelo backend.
}

const userWithoutEmail = {
  password: 'password',
}

const userWithoutPassword = {
  email: 'admim@admim.com',
}

export {
  userMock,
  tokenMock,
  userWithoutEmail,
  userWithoutPassword
}
