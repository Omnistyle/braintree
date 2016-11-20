'use strict';

module.exports = function(deps) {
	var gateway = deps.gateway

	var ret = {
		client_token: function(req, res) {
			gateway.clientToken.generate({
				customerId: req.params.id;
			}, function (err, response) {
				if (err) {
					console.log(err.message)
   			 	if (err.type == "notFoundError") {
   			 		// Gateway will now handle response.
   			 		return gateway.customer.create({
   			 			id: req.params.id
   			 		}, function(err, res){
   			 			// Try again, ignore errors.
   			 			res.client_token(req, res);
   			 		});
   			 	}
				}
				// Will be empty on unhandled failure. 
				res.send(response.clientToken);
			});
		},
		customer: {
			create: function(req, res){
				gateway.customer.create({
					id: req.params.id
				}, function(err, response){
					var message = err ? "error" : "success";
					res.send(message)
				});
			}
		}
	}

	return ret;
}
