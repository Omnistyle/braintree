'use strict';

var debug = require('debug')('fastcart:api');

module.exports = function(deps) {
	var gateway = deps.gateway
	var genericHandler = function(err, res) {
		debug("Generic handling of " + err);
		var message = err ? "error" : "success";
		res.send(message)
	};

	var ret = {
		client_token: function(req, res) {
			debug("Request client token for customer " + req.params.id);
			gateway.clientToken.generate({
				customerId: req.params.id
			}, function (err, response) {
				debug("Client token response:", response);
				if (err || response.errors) {
					debug("Failed to obtain token", response.message);
 			 		// Gateway will now handle response.
 			 		return gateway.customer.create({
 			 			id: req.params.id
 			 		}, function(err, response){
 			 			if (err || response.errors) {
 			 				debug("Failed to create a new customer", response.message);
 			 			}
 			 			ret.client_token(req, res);
 			 		});
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
					debug("Customer create response:", response);
					genericHandler(err, res);
				});
			},
			find: function(req, res){
				gateway.customer.find(req.params.id, function(err, customer){
					debug("Customer find response:", customer);
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
					debug("Payment create response:", result);
					genericHandler(err, res);
				});
			},
			find: function(req, res){
				gateway.paymentMethod.find(req.params.token, function (err, paymentMethod) {
					debug("Payment find response:", paymentMethod);
					genericHandler(err, res);
				});
			},
		},
	};

	return ret;
}
