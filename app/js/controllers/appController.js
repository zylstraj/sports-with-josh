'use strict';

module.exports = function(app) {
  app.controller('AppCtrl', ['$scope', '$http', '$location', 'Auth', function($scope, $http, $location, Auth) {

    $scope.getBlog = function() {
      var url = $location.path();
      url = url.split('/');
      var id = url[url.length - 1];
      $http.get('/blogs/' + id).success(function(response) {
        $scope.blog = response;
      });
    };

    $scope.getAllPosts = function() {
      $http.get('/blogs').success(function(response){
        $scope.blogs = response;
      });
    };

    $scope.submitSignIn = function(user) {
      Auth.signIn(user, function() {
        $location.path('/admin');
      });
    };

    $scope.logMeOut = function() {
      Auth.signOut();
      $location.path('/login');
      console.log('signed out');
    };

    $scope.signup = true;
    $scope.submitSignUp = function(user) {
      Auth.createUser(user, function() {
        $location.path('/login');
      });
    };

    $scope.postBlog = function(newBlog) {
      $http({
        method: 'POST',
        url: '/blogs',
        headers: {
          'Authorization': 'Token ' + Auth.getToken()
        },
        data: newBlog
      })
      .success(function (data){
        console.log(data);
        $location.path('/');
      });
    };
    $scope.editBlog = function(editedBlog) {
      var url = $location.path();
      url = url.split('/');
      var id = url[url.length - 1];
      console.log(id);
      $http({
        method: 'PUT',
        url: '/blogs/' + id,
        headers: {
          'Authorization': 'Token ' + Auth.getToken()
        },
        data: editedBlog
      })
      .success(function (data){
        $scope.blog = data;
        console.log(data);
        $location.path('/admin');
      });
    };
    $scope.adminReturn = function() {
      $location.path('/admin')
    }
    $scope.removeBlog = function(blog) {
      var url = $location.path();
      url = url.split('/');
      var id = url[url.length - 1];
      console.log(id);
      $http({
        method: 'DELETE',
        url: '/blogs/' + blog._id,
        headers: {
          'Authorization': 'Token ' + Auth.getToken()
        },
        data: blog
      })
      .success(function (data){
        // $scope.blog = data;
        delete $scope.data;
        $location.path('/admin');
      });
    };
 // $scope.removePerson = function(blog) {
 //    var url = 'http://localhost:3000';
 //      $http.delete(url + '/blogs/' + blog._id)
 //        .then(function(res){
 //          delete $scope.blog._id
 //          // $scope.blog = $scope.blog.filter((p) => p._id != blog._id);
 //        });
 //      }
    // $scope.uploadImage = function(image) {
    //   var idUrl = '/blogs/' + $scope.image.blogID + '/images';
    //   var fd = new FormData();
    //   fd.append('file', $scope.image.imgFile);
    //   $http({
    //     method: 'PUT',
    //     url: idUrl,
    //     headers: {
    //       'Authorization': 'Token ' + Auth.getToken(),
    //       'Content-Type': 'multipart/mixed',
    //       'Position': $scope.image.position
    //     },
    //     data: fd
    //   })
    //   .success(function (data){
    //     console.log(data);
    //     $location.path('/');
    //   });
    // };

  }]);
};