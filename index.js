const request = require("request");

const createRequest = (input, callback) => {
	let url = "https://api.anyblock.tools/ethereum/";
	const blockchain = input.data.blockchain || "ethereum";
	const network = input.data.network || "mainnet";
	const iface = input.data.interface || "es";
	const query = input.data.query || "";
	const id = input.data.id || "";
	let data, method;

	switch (query.toLowerCase()) {
		case "block":
			method = "POST";
			url = url + blockchain + "/" + network + "/" + iface + "/block/search";
			data = {
				"query": {
					"bool": {
						"filter": {
							"term": {
								"number.num": id
							}
						}
					}
				},
				"_source": ["number.num"]
			}
			break;
		case "blockhash":
			method = "GET";
			url = url + blockchain + "/" + network + "/" + iface + "/block/" + id + "/";
			break;
		case "log":
			method = "POST";
			url = url + blockchain + "/" + network + "/" + iface + "/log/search/";
			data = {
				"query": {
					"bool": {
						"filter": [
							{
								"term": {
									"transactionHash": id
								}
							}
						]
					}
				}
			}
			break;
		case "transaction":
			method = "POST";
			url = url + blockchain + "/" + network + "/" + iface + "/tx/search/";
			data = {
				"query": {
					"bool": {
						"filter": [
							{
								"term": {
									"_id": id
								}
							}
						]
					}
				}
			}
		default:
			break;
	}

	const options = {
		method: method,
		url: url,
		headers: {
			"Authorization": "Bearer " + process.env.API_KEY,
			"Content-Type": "application/json"
		},
		json: data || true
	}
	request(options, (error, response, body) => {
		if (error || response.statusCode >= 400) {
			callback(response.statusCode, {
				jobRunID: input.id,
				status: "errored",
				error: body,
				statusCode: response.statusCode
			});
		} else {
			callback(response.statusCode, {
				jobRunID: input.id,
				data: body,
				statusCode: response.statusCode
			});
		}
	});
};

exports.gcpservice = (req, res) => {
	createRequest(req.body, (statusCode, data) => {
		res.status(statusCode).send(data);
	});
};

exports.handler = (event, context, callback) => {
	createRequest(event, (statusCode, data) => {
		callback(null, data);
	});
};

exports.handlerv2 = (event, context, callback) => {
	createRequest(JSON.parse(event.body), (statusCode, data) => {
		callback(null, {
			statusCode: statusCode,
			body: JSON.stringify(data),
			isBase64Encoded: false
		});
	});
};

module.exports.createRequest = createRequest;