const EventEmitter = require("events");
const {Delta} = require("../index");
const DeltaClient = require("../client");

class Irrigation extends EventEmitter {
	constructor(){
		super();
		this.proxy = new Delta();
	}

	async start(){
		this.on("stop", () => { this.proxy.stop(); });
		this.localControlURL = await this.proxy.start();
	}

	client(){
		return new DeltaClient( this.localControlURL );
	}

	stop(){
		this.emit("stop");
	}
}

module.exports = {
	Irrigation
}