angular.module("users").controller("UsersController", [
  "$scope",
  "Users",
  function($scope, Users) {
    console.log("this ran");
    Users.getSession().then(response => {
      console.log("getting session", response);
      // $scope.currentUser = $.parseJSON(sessionStorage.getItem("user"));
      if (response.status == 200) {
        if (response.data == "") {
          $scope.loggedIn = "no";
        } else if (response.data.isAdmin == true) {
          $scope.loggedIn = "admin";
          $scope.sessionInfo = response.data;
        } else {
          $scope.loggedIn = "yes";
          $scope.sessionInfo = response.data;
        }
      }

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
            window.location.href = "/home";
          });
      };

      $scope.authenticateUser = function(email, password) {
        Users.authenticate(email, password)
          .then(res => {
            console.log("res.data", res);
            if (res.status == 200) {
              sessionStorage.setItem("user", JSON.stringify(res.data));
              console.log("looged in successfully");
              window.location.href = "/home";
            }
          })
          .catch(err => {
            alert("Please try again, incorrect credentials provided");
            window.location.href = "/home";
          });
      };

      $scope.logout = function() {
        Users.logout()
          .then(response => {
            console.log(response.status);
            if (response.status == 200) {
              $scope.loggedIn = "no";
              sessionStorage.removeItem("user");
              window.location.href = "/home";
            }
          })
          .catch(err => {
            alert("logout unsuccessful...");
          });
      };

      $scope.getUserInfo = function() {
        $scope.currentUser = $.parseJSON(sessionStorage.getItem("user"));
      };

      $scope.deleteUser = function(id) {
        Users.delete(id).then(
          function(response) {
            alert("You're account was deleted");
            window.location.href = "/home";
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
              window.location.href = "/home";
              console.log("user successfully updated:", res.data);
            })
            .catch(err => {
              console.log("couldn't update user: ", err);
            })
        }
    

      $scope.showDetails = function(index) {
        $scope.detailedInfo = $scope.listings[index];
      };
    });
  }
]);