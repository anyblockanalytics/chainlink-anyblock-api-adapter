require('dotenv').config()
const assert = require("chai").assert;
const createRequest = require("../index.js").createRequest;

describe("createRequest", () => {
	const jobID = "278c97ffadb54a5bbb93cfec5f7b5503";

	context("when querying a transaction", () => {
		const req = {
			id: jobID,
			data: {
				query: "transaction",
				id: "0xdebb061255310e8c109379a2556fec666789c663225f20d16e8e1332f395b3c5"
			}
		};

		it("returns data to the node", (done) => {
			createRequest(req, (statusCode, data) => {
				assert.equal(statusCode, 200);
				assert.equal(data.jobRunID, jobID);
				assert.isNotEmpty(data.data);
				done();
			});
		});
	});

	context("when querying a blockhash", () => {
		const req = {
			id: jobID,
			data: {
				query: "blockhash",
				id: "0x3b36d41b5478cdd30b133205de0adb72d21092dabfc87f2a9d835b5a53ec0f7e"
			}
		};

		it("returns data to the node", (done) => {
			createRequest(req, (statusCode, data) => {
				assert.equal(statusCode, 200);
				assert.equal(data.jobRunID, jobID);
				assert.isNotEmpty(data.data);
				done();
			});
		});
	});

	context("when querying a block number", () => {
		const req = {
			id: jobID,
			data: {
				query: "block",
				id: "8317172"
			}
		};

		it("returns data to the node", (done) => {
			createRequest(req, (statusCode, data) => {
				assert.equal(statusCode, 200);
				assert.equal(data.jobRunID, jobID);
				assert.isNotEmpty(data.data);
				done();
			});
		});
	});

	context("when querying a log", () => {
		const req = {
			id: jobID,
			data: {
				query: "log",
				id: "0xdebb061255310e8c109379a2556fec666789c663225f20d16e8e1332f395b3c5"
			}
		};

		it("returns data to the node", (done) => {
			createRequest(req, (statusCode, data) => {
				assert.equal(statusCode, 200);
				assert.equal(data.jobRunID, jobID);
				assert.isNotEmpty(data.data);
				done();
			});
		});
	});
});
