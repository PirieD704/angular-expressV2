var searchApp = angular.module("searchApp", []);
searchApp.controller('searchController', function($scope, $http){


	$http({
		// this is the angular way to make an http GET request, the alternative is done below for the POST request
		method: "GET",
		//Go make a get request to localhost:3000/getStudents
		// Express will be waiting!!!
		url: 'http://localhost:3000/getStudents'
	}).then(
	// when the request is done, call success of failure
	function successCallback(response){
		// If successful, set studentArray = the json that we get back
		$scope.studentArray = response.data
	}, function failureCallback(response){
		$scope.result = "ERROR!";
		console.log("Could not get students...");
	}
	);
	
	$scope.addStudent = ()=>{
		console.log($scope.newStudent);
		//Make an http post request to localhost3000/ addStudent
		//Express happens to be listening there
		$http.post('http://localhost:3000/addStudent', {
			// Pass it an object with twe properties
			// These properties correspond to req.body
			name: $scope.newStudent,
			gender: "Unknown"
		}).then( function successCallback(response){
			// As soon as AJAX is back, run the following 
			// If successful..
			if(response.data.message == 'added'){
				$scope.studentArray.push(response.data)
			}
			console.log(response.data);
		}, function errorCallback(response){
			//If unsuccessful..
			console.log('ERROR!!');
			console.log(response.data);
		});
	}

	$scope.removeStudent = (index, student) =>{
		$scope.studentArray.splice(index, 1);
		$http({
			method: "POST",
			url: "http://localhost:3000/removeStudent?student=" + student.name
		}).then( function successCallback(response){
			// As soon as AJAX is back, run the following 
			// If successful..
			if(response.data.message == 'added'){
				$scope.studentArray.push(response.data)
			}
			console.log(response.data);
		}, function errorCallback(response){
			//If unsuccessful..
			console.log('ERROR!!');
			console.log(response.data);
		});
	}

})

