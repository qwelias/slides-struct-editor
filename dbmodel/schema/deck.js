"use strict";

const defaultRevealConfigSchema = require( '../extra/revealCfg' );

const fragment = {
	attr: {
		type: "Mixed"
	},
	title: {
		type: "String"
	},
	content: {
		document: {
			type: "String"
		},
		year: {
			type: "String"
		},
		period: {
			type: "String"
		},
		report: {
			type: "String"
		},
		mode: {
			type: "String"
		},
		src: {
			type: "String"
		}
	}
}

const slide = {
	attr: {
		type: "Mixed"
	},
	fragments: [ fragment ],
	title: {
		type: "String"
	}
}

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
			index: true
		},
		slides: [ slide ]
	}
}
