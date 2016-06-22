module.exports = {
	config: {
		controls: {
			default: true,
			type: "Boolean"
		},
		progress: {
			default: true,
			type: "Boolean"
		},
		slideNumber: {
			default: false,
			type: "Boolean"
		},
		history: {
			default: false,
			type: "Boolean"
		},
		keyboard: {
			default: true,
			type: "Boolean"
		},
		overview: {
			default: true,
			type: "Boolean"
		},
		center: {
			default: true,
			type: "Boolean"
		},
		touch: {
			default: true,
			type: "Boolean"
		},
		loop: {
			default: false,
			type: "Boolean"
		},
		rtl: {
			default: false,
			type: "Boolean"
		},
		shuffle: {
			default: false,
			type: "Boolean"
		},
		fragments: {
			default: true,
			type: "Boolean"
		},
		embedded: {
			default: false,
			type: "Boolean"
		},
		help: {
			default: true,
			type: "Boolean"
		},
		showNotes: {
			default: false,
			type: "Boolean"
		},
		autoSlide: {
			default: 0,
			type: "Number"
		},
		autoSlideStoppable: {
			default: true,
			type: "Boolean"
		},
		mouseWheel: {
			default: false,
			type: "Boolean"
		},
		hideAddressBar: {
			default: true,
			type: "Boolean"
		},
		previewLinks: {
			default: false,
			type: "Boolean"
		},
		transition: {
			default: "default",
			type: "String",
			enum: [ "none", "fade", "slide", "convex", "concave", "zoom", "default" ]
		},
		transitionSpeed: {
			default: "default",
			type: "String",
			enum: [ "default", "fast", "slow" ]
		},
		backgroundTransition: {
			default: "default",
			type: "String",
			enum: [ "none", "fade", "slide", "convex", "concave", "zoom", "default" ]
		},
		viewDistance: {
			default: 3,
			type: "Number"
		},
		parallaxBackgroundImage: {
			default: "",
			type: "String"
		},
		parallaxBackgroundSize: {
			default: "",
			type: "String"
		},
		parallaxBackgroundHorizontal: {
			default: 0,
			type: "Number"
		},
		parallaxBackgroundVertical: {
			default: 0,
			type: "Number"
		}
	},
	init: {
		// The "normal" size of the presentation, aspect ratio will be preserved
		// when the presentation is scaled to fit different resolutions. Can be
		// specified using percentage units.
		width: {
			default: "1080",
			type: "String"
		},
		height: {
			default: "772",
			type: "String"
		},

		// Factor of the display size that should remain empty around the content
		margin: {
			default: 0.1,
			type: Number
		},

		// Bounds for smallest/largest possible scale to apply to content
		minScale: {
			default: 0.2,
			type: Number
		},
		maxScale: {
			default: 1.5,
			type: Number
		}
	},
	theme: {
		type: "String",
		enum: [ "black", "white", "league", "beige", "sky", "night", "serif", "simple", "solarized" ],
		default: "black"
	}
}
