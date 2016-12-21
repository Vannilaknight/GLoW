var request = require('request');

module.exports = function (app, config) {

  app.get('/partials/*', function (req, res) {
    res.render('../../public/app/' + req.params[0]);
  });

  app.all('/api/*', function (req, res) {
    res.send(404);
  });

  app.post('/user', function (req, res) {
    var data = req.body;
    var registerUser = {
      username: data.username,
      email: data.email,
      password: data.password,
      confirm: data.confirm
    };

    console.log(registerUser);
    request.post({
      url: config.self.glow_api + "/api/users",
      body: registerUser,
      json: true
    }, function (err, response, body) {
      console.log(response.statusCode);
      res.send(response.statusCode)
    });
  });

  app.put('/user', function (req, res) {
    res.send(req.statusCode);
  });

  app.post('/logout', function (req, res) {
    var data = req.body;

    if (data.logout) {
      request.post({url: config.self.glow_api + "/logout", body: data, json: true}, function (err, response, body) {
        if (response.statusCode == 200) {
          res.sendStatus(response.statusCode);
        } else {
          res.send(response.statusCode)
        }
      });
    } else {
      res.send(401);
    }
  });

  app.post('/login', function (req, res) {
    var data = req.body;
    var loginData = {
      username: data.username,
      password: data.password
    };

    request.post({url: config.self.glow_api + "/login", body: loginData, json: true}, function (err, response, body) {
      if (response.statusCode == 200) {
        var data = response.body;
        if (data.success) {
          res.send({success: true, user: data.user});
        } else {
          res.send(401)
        }
      } else {
        res.send(response.statusCode)
      }
    });
  });


  app.get('*', function (req, res) {
    res.render('index');
  });
};
