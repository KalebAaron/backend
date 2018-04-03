const actions = {
  create: 'Create',
  update: 'Update',
  remove: 'Remove',
  find: 'Find',
  findAll: 'Find All'
}

const models = {
  user: {
    name: 'User',
    endpoint: 'users',
    preventDefaultApi: true,
    useCustomRoutes: true
  },
  keep: {
    name: 'Post',
    endpoint: 'post',
    useCustomRoutes: true
  },
  vault: {
    name: 'Vault',
    endpoint: 'vault',
    useCustomRoutes: true
  }
}


export  {
  actions,
  models
}