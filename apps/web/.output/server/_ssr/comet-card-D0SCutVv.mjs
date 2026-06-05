import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { Lt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { n as cn } from "./style-De8YRxv-.mjs";
import { a as useSpring, c as useMotionValue, l as motion, o as useTransform, s as useMotionTemplate } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/comet-card-D0SCutVv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CometCard = ({ rotateDepth = 17.5, translateDepth = 20, glareOpacity = .4, scaleFactor = 1.05, className, children }) => {
	const ref = (0, import_react.useRef)(null);
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const mouseXSpring = useSpring(x);
	const mouseYSpring = useSpring(y);
	const rotateX = useTransform(mouseYSpring, [-.5, .5], [`-${rotateDepth}deg`, `${rotateDepth}deg`]);
	const rotateY = useTransform(mouseXSpring, [-.5, .5], [`${rotateDepth}deg`, `-${rotateDepth}deg`]);
	const translateX = useTransform(mouseXSpring, [-.5, .5], [`-${translateDepth}px`, `${translateDepth}px`]);
	const translateY = useTransform(mouseYSpring, [-.5, .5], [`${translateDepth}px`, `-${translateDepth}px`]);
	const glareBackground = useMotionTemplate`radial-gradient(circle at ${useTransform(mouseXSpring, [-.5, .5], [0, 100])}% ${useTransform(mouseYSpring, [-.5, .5], [0, 100])}%, rgba(255, 255, 255, 0.9) 10%, rgba(255, 255, 255, 0.75) 20%, rgba(255, 255, 255, 0) 80%)`;
	const handleMouseMove = (e) => {
		if (!ref.current) return;
		const rect = ref.current.getBoundingClientRect();
		const width = rect.width;
		const height = rect.height;
		const mouseX = e.clientX - rect.left;
		const mouseY = e.clientY - rect.top;
		const xPct = mouseX / width - .5;
		const yPct = mouseY / height - .5;
		x.set(xPct);
		y.set(yPct);
	};
	const handleMouseLeave = () => {
		x.set(0);
		y.set(0);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("perspective-distant transform-3d", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			ref,
			initial: {
				scale: 1,
				z: 0
			},
			onMouseMove: handleMouseMove,
			onMouseLeave: handleMouseLeave,
			className: "relative rounded-md will-change-transform",
			whileHover: {
				z: 50,
				scale: scaleFactor,
				transition: { duration: .2 }
			},
			style: {
				rotateX,
				rotateY,
				translateX,
				translateY
			},
			children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				transition: { duration: .2 },
				style: {
					background: glareBackground,
					opacity: glareOpacity
				},
				className: "pointer-events-none absolute inset-0 z-50 h-full w-full rounded-md mix-blend-overlay will-change-[opacity]"
			})]
		})
	});
};
//#endregion
export { CometCard as t };
