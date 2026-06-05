import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { Lt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { a as useSpring, c as useMotionValue, r as useInView } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/count-up-VniHQ91S.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CountUp({ to, from = 0, direction = "up", delay = 0, duration = 2, className = "", startWhen = true, separator = "", onStart, onEnd, "aria-hidden": ariaHidden, "aria-live": ariaLive = "polite", "aria-atomic": ariaAtomic = "true" }) {
	const ref = (0, import_react.useRef)(null);
	const motionValue = useMotionValue(direction === "down" ? to : from);
	const springValue = useSpring(motionValue, {
		damping: 20 + 40 * (1 / duration),
		stiffness: 100 * (1 / duration)
	});
	const isInView = useInView(ref, {
		once: true,
		margin: "0px"
	});
	const getDecimalPlaces = (num) => {
		const str = num.toString();
		if (str.includes(".")) {
			const decimals = str.split(".")[1];
			if (Number.parseInt(decimals, 10) !== 0) return decimals.length;
		}
		return 0;
	};
	const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to));
	const formatValue = (0, import_react.useCallback)((latest) => {
		const hasDecimals = maxDecimals > 0;
		const options = {
			useGrouping: !!separator,
			minimumFractionDigits: hasDecimals ? maxDecimals : 0,
			maximumFractionDigits: hasDecimals ? maxDecimals : 0
		};
		const formattedNumber = Intl.NumberFormat("en-US", options).format(latest);
		return separator ? formattedNumber.replace(/,/g, separator) : formattedNumber;
	}, [maxDecimals, separator]);
	(0, import_react.useEffect)(() => {
		if (ref.current) ref.current.textContent = formatValue(direction === "down" ? to : from);
	}, [
		from,
		to,
		direction,
		formatValue
	]);
	(0, import_react.useEffect)(() => {
		if (isInView && startWhen) {
			if (typeof onStart === "function") onStart();
			const timeoutId = setTimeout(() => {
				motionValue.set(direction === "down" ? from : to);
			}, delay * 1e3);
			const durationTimeoutId = setTimeout(() => {
				if (typeof onEnd === "function") onEnd();
			}, delay * 1e3 + duration * 1e3);
			return () => {
				clearTimeout(timeoutId);
				clearTimeout(durationTimeoutId);
			};
		}
	}, [
		isInView,
		startWhen,
		motionValue,
		direction,
		from,
		to,
		delay,
		onStart,
		onEnd,
		duration
	]);
	(0, import_react.useEffect)(() => {
		const unsubscribe = springValue.on("change", (latest) => {
			if (ref.current) ref.current.textContent = formatValue(latest);
		});
		return () => unsubscribe();
	}, [springValue, formatValue]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		ref,
		className,
		"aria-hidden": ariaHidden,
		"aria-live": ariaHidden ? void 0 : ariaLive,
		"aria-atomic": ariaHidden ? void 0 : ariaAtomic
	});
}
//#endregion
export { CountUp as t };
