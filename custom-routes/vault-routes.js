let Keep = require('../models/keep')
let Vault = require('../models/vault')

export default {
  vaultsByUserId: {
    path: '/getVaults/:userId',
    reqType: 'get',
    method(req, res, next) {
      //debugger
      let action = 'Get Vaults by UserId'
      Vault.find({ creatorId: req.params.userId })
        .then(vaults => {
          //debugger
          res.send(handleResponse(action, vaults))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  addPostToVault: {
    path: '/addPostToVault/:vaultId',
    reqType: 'put',
    method(req, res, next) {
      //debugger
      let action = 'Add post to Vault'
      Vault.findById(req.params.vaultId).then(vault => {
        //debugger
        if (!vault) {
          res.sendStatus(404)({ error: "Vault Not Found" })
        } else {
          vault.posts.push(req.body)
          vault.save().then(() => {
            res.send(handleResponse(action, vault))
          })
            .catch(error => {
              return next(handleResponse(action, null, error))
            })
        }
      })
    }
  },


  getVaultPosts: {
    path: '/getVaultPosts/:vaultId',
    reqType: 'get',
    method(req, res, next) {
      //debugger
      let action = 'Get posts by VaultId'
      Vault.findById(req.params.vaultId)
        .then(vault => {
          //debugger
          var vaultPosts = []
          for (var i = 0; i < vault.posts.length; i++) {
            //debugger
            var postId = vault.posts[i];
            Post.findById(postId).then(post => {
              //debugger
              vaultPosts.push(post)
            }).then(() => {
              //debugger
              res.send(handleResponse(action, vaultPosts))
            }).catch(error => {
              return next(handleResponse(action, null, error))
            })
          }
        })
    }
  },
}

function handleResponse(action, data, error) {
  var response = {
    action: action,
    data: data
  }
  if (error) {
    response.error = error
  }
  return response
}
