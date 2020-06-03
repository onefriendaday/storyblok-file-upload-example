var axios = require('axios')
var FormData = require('form-data')
var fs = require('fs')
var file = './test.txt'
var accessToken = 'YOUR_PERSONAL_ACCESS_TOKEN' // Can be found at https://app.storyblok.com/#!/me/account
var spaceId = 'YOUR_SPACE_ID'

var fileUpload = function(signed_request, success, failed) {
  var form = new FormData()
  for (var key in signed_request.fields) {
    form.append(key, signed_request.fields[key])
  }
  form.append('file', fs.createReadStream(file))
  form.submit(signed_request.post_url, function(err, res) {
    if (err) throw err
    console.log('https://a.storyblok.com/' + signed_request.fields.key + ' UPLOADED!')
  })
}

var signAsset = function(access_token) {
  axios.post('https://api.storyblok.com/v1/spaces/' + spaceId + '/assets', {
    // add the id to update an existing asset. 'id: 123,'
    filename: 'test.txt',
    size: '400x500',
    asset_folder_id: null
  }, {
    headers: {'Authorization': access_token}
  })
  .then(function (response) {
    fileUpload(response.data, function() {
      console.log('Done')
    }, function() {
      console.log('Failed')
    })
  })
  .catch(function (error) {
    console.log(error)
  })
}

signAsset(accessToken)


