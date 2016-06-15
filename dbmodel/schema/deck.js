const defaultRevealConfigSchema = require( '../extra/revealCfg' );

const fragment = {
	attr: {
		type: "Mixed"
	},
	title: {
		type: "String"
	},
	content: {
		type: "String",
		required: true
	}
}

const slide = {
	attr: {
		type: "Mixed"
	},
	fragments: [fragment],
	title: {
		type: "String"
	},
	content: {
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
		theme: {
			type: "String",
			enum: [ "black", "white", "league", "beige", "sky", "night", "serif", "simple", "solarized" ],
			default: "black"
		},
		title: {
			type: "String",
			required: true,
			unique: true,
			index: true
		},
		slides: [slide]
	}
}
