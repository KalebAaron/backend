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
  addKeepToVault: {
    path: '/addKeepToVault/:vaultId',
    reqType: 'put',
    method(req, res, next) {
      //debugger
      let action = 'Add keep to Vault'
      Vault.findById(req.params.vaultId).then(vault => {
        //debugger
        if (!vault) {
          res.sendStatus(404)({ error: "Vault Not Found" })
        } else {
          vault.keeps.push(req.body)
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

  incrementPoints: {
    path: '/incrementpoints/:keepId',
    reqType: 'put',
    method(req, res, next) {
      //debugger
      let action = 'increment keep points'
      Keep.findById(req.params.keepId).then(keep => {
        //debugger
        if (!vault) {
          res.sendStatus(404)({ error: "Vault Not Found" })
        } else {
          keep.keepCount += 1;
          keep.save().then(() => {
            res.send(handleResponse(action, keep))
          })
            .catch(error => {
              return next(handleResponse(action, null, error))
            })
        }
      })
    }
  },

  getVaultKeeps: {
    path: '/getVaultKeeps/:vaultId',
    reqType: 'get',
    method(req, res, next) {
      //debugger
      let action = 'Get keeps by VaultId'
      Vault.findById(req.params.vaultId)
        .then(vault => {
          //debugger
          var vaultKeeps = []
          for (var i = 0; i < vault.keeps.length; i++) {
            //debugger
            var keepId = vault.keeps[i];
            Keep.findById(keepId).then(keep => {
              //debugger
              vaultKeeps.push(keep)
            }).then(() => {
              //debugger
              res.send(handleResponse(action, vaultKeeps))
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
