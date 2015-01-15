// fetch JSON data to share between controllers
app.service('JSONData', ['$http', function($http) {
	this.getDataAsync = function(callback) {
		$http({
			method: 'GET',
			url: '/ng-app/data/data.json'
		}).success(callback);
	}
}]);