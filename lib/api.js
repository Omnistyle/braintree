'use strict';

module.exports = function(deps) {
	var gateway = deps.gateway
	var genericHandler = function(err, res) {
		var message = err ? "error" : "success";
		res.send(message)
	};

	var ret = {
		client_token: function(req, res) {
			gateway.clientToken.generate({
				customerId: req.params.id
			}, function (err, response) {
				if (err) {
					console.log(err.message)
   			 	if (err.type == "notFoundError") {
   			 		// Gateway will now handle response.
   			 		return gateway.customer.create({
   			 			id: req.params.id
   			 		}, function(err, response){
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
  			var id = req.body.id;
				gateway.customer.create({
					id: req.params.id
				}, function(err, response){
					genericHandler(err, res);
				});
			},
			find: function(req, res){
				gateway.customer.find(req.params.id, function(err, customer){
					genericHandler(err, res);
				});
			},
		},
		payment: {
			create: function(req, res){
				var id = req.body.customer_id;
  			var nonce = req.body.payment_method_nonce;
				gateway.paymentMethod.create({
				  customerId: id,
				  paymentMethodNonce: nonce
				}, function (err, result) {
					genericHandler(err, res);
				});
			},
			find: function(req, res){
				gateway.paymentMethod.find(req.params.token, function (err, paymentMethod) {
					genericHandler(err, res);
				});
			},
		},
	};

	return ret;
}
