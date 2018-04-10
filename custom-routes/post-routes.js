let Keep = require('../models/keep')

export default {
  keepsByUserId: {
    path: '/getPosts/:userId',
    reqType: 'get',
    method(req, res, next) {
      //debugger
      let action = 'Get Posts by UserId'
      Post.find({ creatorId: req.params.userId })
        .then(post => {
          res.send(handleResponse(action, keeps))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
    addPostToVault: {
    path: '/addVaultIdToPost/:collectionId',
    reqType: 'put',
    method(req, res, next) {
      //debugger
      let action = 'Add Collection Id to Post'
      Post.findById(req.body._id).then(post => {
          //debugger
          if (!post) {
            res.sendStatus(404)({ error: "Post Not Found" })
          } else {
            post.vaultIds.push(req.params.vaultId)
            post.save().then(() => {
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