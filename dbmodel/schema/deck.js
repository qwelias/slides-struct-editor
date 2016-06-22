"use strict";

const defaultRevealConfigSchema = require( '../extra/revealCfg' );

const fragment = {
	attr: {
		type: "Mixed"
	},
	title: {
		type: "String",
		trim: true
	},
	content: {
		generate:{
			document: {
				type: "String",
				trim: true
			},
			year: {
				type: "String",
				trim: true
			},
			period: {
				type: "String",
				trim: true
			},
			report: {
				type: "String",
				trim: true
			},
			mode: {
				type: "String",
				trim: true
			}
		},
		html: {
			type: "String",
			trim: true
		},
		markdown: {
			type: "String",
			trim: true
		},
		img: {
			type: "String",
			trim: true
		}
	}
};

const slide = {
	attr: {
		type: "Mixed"
	},
	fragments: [ fragment ],
	title: {
		type: "String",
		trim: true
	}
};

module.exports = {
	plugin: {
		createdmodified: {
			index: true
		}
	},
	schema: {
		reveal: defaultRevealConfigSchema,
		title: {
			type: "String",
			required: true,
			unique: true,
			index: true,
			trim: true
		},
		slides: [ slide ]
	}
};
