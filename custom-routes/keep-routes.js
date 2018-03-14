let Keep = require('../models/keep')

export default {
  keepsByUserId: {
    path: '/getKeeps/:userId',
    reqType: 'get',
    method(req, res, next) {
      //debugger
      let action = 'Get Keeps by UserId'
      Keep.find({ creatorId: req.params.userId })
        .then(keeps => {
          res.send(handleResponse(action, keeps))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
    addKeepToVault: {
    path: '/addVaultIdToKeep/:vaultId',
    reqType: 'put',
    method(req, res, next) {
      //debugger
      let action = 'Add Vault Id to Keep'
      Keep.findById(req.body._id).then(keep => {
          //debugger
          if (!keep) {
            res.sendStatus(404)({ error: "Keep Not Found" })
          } else {
            keep.vaultIds.push(req.params.vaultId)
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