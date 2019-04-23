angular.module("users").controller("UsersController", [
  "$scope",
  "Users",
  function($scope, Users) {
    console.log("this ran");
    $scope.loggedIn = "no";
    /* Get all the listings, then bind it to the scope */
    $scope.addUser = function(
      newFirst,
      newMiddle,
      newLast,
      newPass,
      newPassVerify,
      newEmail,
      newPhone
    ) {
      if (newPass != newPassVerify) {
        alert("Passwords don't match, please try again.");
        window.location.href = "../index.html";
      }
      var newUser = {
        name: {
          first: newFirst,
          middle: newMiddle,
          last: newLast
        },
        email: newEmail,
        password: newPass,
        phoneNumber: newPhone
      };
      Users.create(newUser)
        .then(res => {
          if (res.status == 200) alert("User successfully registered!");
        })
        .catch(err => {
          if (err.data.code == 11000) {
            alert("That email has already been registered!");
          } else {
            alert("User could not be created.");
          }
          window.location.href = "#!/";
        });
    };

    $scope.authenticateUser = function(email, password) {
      Users.authenticate(email, password)
        .then(res => {
          console.log("res.data", res);
          if (res.status == 200) {
            if (res.data.email.substr(0, 6) == "BTADM-") {
              sessionStorage.setItem("user", JSON.stringify(res.data));
              $scope.loggedIn = "admin";
              window.location.href = "#!/home";
            } else {
              sessionStorage.setItem("user", JSON.stringify(res.data));
              $scope.loggedIn = "yes";
              window.location.href = "#!/home";
            }
          }
        })
        .catch(err => {
          alert("Please try again, incorrect credentials provided");
          window.location.href = "#!/home";
        });
    }

    $scope.logout = function() {
      Users.logout()
        .then(response => {
          console.log(response.status);
          if (response.status == 200) {
            $scope.currentUser = null;
            $scope.loggedIn = "no";
            sessionStorage.removeItem("user");
            window.location.href = "#!/";
          }
        })
        .catch(err => {
          alert("logout unsuccessful...");
        });
    };
    $scope.updateUser = function(id,
    updatedFirst,
    updatedMiddle,
    updatedLast,
    updatedEmail,
    updatedPhone,
    updatedPass
    ) {
      var updatedUser = {
        name: {
          first: updatedFirst,
          middle: updatedMiddle,
          last: updatedLast
        },
        email: updatedEmail,
        password: updatedPass,
        phoneNumber: updatedPhone
      };
      Users.update(id, updatedUser)
        .then(res => {
          window.location.href = "#!/home";
          console.log("user successfully updated:", res.data);
        })
        .catch(err => {
          console.log("couldn't update user: ", err);
        })
    }

    $scope.getSession = function() {
      console.log("did this");
      Users.getSession().then(response => {
        console.log(response);
        $scope.currentUser = $.parseJSON(sessionStorage.getItem("user"));
        if (response.status == 200) {
          console.log("test", response.text, response.body.text);
          console.log("all good, got session");
        }
      });
    };

    $scope.deleteUser = function(id) {
      Users.delete(id).then(
        function(response) {
          alert("You're account was deleted");
          window.location.href = "#!/home"
          $scope.users = response.data;
          Users.getAll().then(
            function(response) {
              $scope.users = response.data;
            },
            function(error) {
              console.log("Unable to retrieve users:", error);
            }
          );
        },
        function(error) {
          console.log("Unable to retrieve users:", error);
        }
      );
    };

    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.listings[index];
    };

    $scope.showName = function() {
      $scope.sessionUsername = $.parseJSON(
        sessionStorage.getItem("user")
      ).email;
      console.log("sessionname", $scope.sessionUsername);
    };
  }
]);
