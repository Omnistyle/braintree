# FastCart Braintree Server

[![Build Status](https://travis-ci.org/braintree/braintree_express_example.svg?branch=master)](https://travis-ci.org/braintree/braintree_express_example)

## Running tests

All tests are integration tests. Integration tests make API calls to Braintree and require that you set up your Braintree credentials. You can run this project's integration tests by adding your sandbox API credentials to `.env` and running the following commands:

```sh
# Start your node server
npm start

# Open another shell and run
npm test
```

## Testing Transactions

Sandbox transactions must be made with [sample credit card numbers](https://developers.braintreepayments.com/reference/general/testing/node#credit-card-numbers), and the response of a `Transaction.sale()` call is dependent on the [amount of the transaction](https://developers.braintreepayments.com/reference/general/testing/node#test-amounts).

## Disclaimer

This code is provided as is and is only intended to be used for illustration purposes. This code is not production-ready and is not meant to be used in a production environment. This repository is to be used as a tool to help merchants learn how to integrate with Braintree. Any use of this repository or any of its code in a production environment is highly discouraged.
