import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "./@ai-sdk/react+[...].mjs";
import { n as normalizeRegisterableHotkey, r as detectPlatform, t as getHotkeyManager } from "./@tanstack/hotkeys+[...].mjs";
//#region ../../node_modules/.pnpm/@tanstack+react-hotkeys@0.1_920c04900dbac09f561fc4415ea8a307/node_modules/@tanstack/react-hotkeys/dist/HotkeysProvider.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var HotkeysContext = (0, import_react.createContext)(null);
var DEFAULT_OPTIONS = {};
function HotkeysProvider({ children, defaultOptions = DEFAULT_OPTIONS }) {
	const contextValue = (0, import_react.useMemo)(() => ({ defaultOptions }), [defaultOptions]);
	return /* @__PURE__ */ import_react.createElement(HotkeysContext.Provider, { value: contextValue }, children);
}
function useDefaultHotkeysOptions() {
	return (0, import_react.useContext)(HotkeysContext)?.defaultOptions ?? {};
}
//#endregion
//#region ../../node_modules/.pnpm/@tanstack+react-hotkeys@0.1_920c04900dbac09f561fc4415ea8a307/node_modules/@tanstack/react-hotkeys/dist/utils.js
/**
* Type guard to check if a value is a React ref-like object.
*/
function isRef(value) {
	return value !== null && typeof value === "object" && "current" in value;
}
//#endregion
//#region ../../node_modules/.pnpm/@tanstack+react-hotkeys@0.1_920c04900dbac09f561fc4415ea8a307/node_modules/@tanstack/react-hotkeys/dist/useHotkey.js
/**
* React hook for registering a keyboard hotkey.
*
* Uses the singleton HotkeyManager for efficient event handling.
* The callback receives both the keyboard event and a context object
* containing the hotkey string and parsed hotkey.
*
* This hook syncs the callback and options on every render to avoid
* stale closures. This means
* callbacks that reference React state will always have access to
* the latest values.
*
* @param hotkey - The hotkey string (e.g., 'Mod+S', 'Escape') or RawHotkey object (supports `mod` for cross-platform)
* @param callback - The function to call when the hotkey is pressed
* @param options - Options for the hotkey behavior. `enabled: false` keeps the registration (visible in devtools)
*   and only suppresses firing; the hook updates the existing handle instead of unregistering.
*
* @example
* ```tsx
* function SaveButton() {
*   const [count, setCount] = useState(0)
*
*   // Callback always has access to latest count value
*   useHotkey('Mod+S', (event, { hotkey }) => {
*     console.log(`Save triggered, count is ${count}`)
*     handleSave()
*   })
*
*   return <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
* }
* ```
*
* @example
* ```tsx
* function Modal({ isOpen, onClose }) {
*   // enabled option is synced on every render
*   useHotkey('Escape', () => {
*     onClose()
*   }, { enabled: isOpen })
*
*   if (!isOpen) return null
*   return <div className="modal">...</div>
* }
* ```
*
* @example
* ```tsx
* function Editor() {
*   const editorRef = useRef<HTMLDivElement>(null)
*
*   // Scoped to a specific element
*   useHotkey('Mod+S', () => {
*     save()
*   }, { target: editorRef })
*
*   return <div ref={editorRef}>...</div>
* }
* ```
*/
function useHotkey(hotkey, callback, options = {}) {
	const mergedOptions = {
		...useDefaultHotkeysOptions().hotkey,
		...options
	};
	const manager = getHotkeyManager();
	const registrationRef = (0, import_react.useRef)(null);
	const callbackRef = (0, import_react.useRef)(callback);
	const optionsRef = (0, import_react.useRef)(mergedOptions);
	const managerRef = (0, import_react.useRef)(manager);
	callbackRef.current = callback;
	optionsRef.current = mergedOptions;
	managerRef.current = manager;
	const prevTargetRef = (0, import_react.useRef)(null);
	const prevHotkeyRef = (0, import_react.useRef)(null);
	const hotkeyString = normalizeRegisterableHotkey(hotkey, mergedOptions.platform ?? detectPlatform());
	const { target: _target, ...optionsWithoutTarget } = mergedOptions;
	(0, import_react.useEffect)(() => {
		const resolvedTarget = isRef(optionsRef.current.target) ? optionsRef.current.target.current : optionsRef.current.target ?? (typeof document !== "undefined" ? document : null);
		if (!resolvedTarget) {
			if (registrationRef.current?.isActive) {
				registrationRef.current.unregister();
				registrationRef.current = null;
			}
			prevTargetRef.current = null;
			prevHotkeyRef.current = null;
			return;
		}
		const targetChanged = prevTargetRef.current !== null && prevTargetRef.current !== resolvedTarget;
		const hotkeyChanged = prevHotkeyRef.current !== null && prevHotkeyRef.current !== hotkeyString;
		if (registrationRef.current?.isActive && (targetChanged || hotkeyChanged)) {
			registrationRef.current.unregister();
			registrationRef.current = null;
		}
		if (!registrationRef.current || !registrationRef.current.isActive) registrationRef.current = managerRef.current.register(hotkeyString, callbackRef.current, {
			...optionsRef.current,
			target: resolvedTarget
		});
		prevTargetRef.current = resolvedTarget;
		prevHotkeyRef.current = hotkeyString;
		return () => {
			if (registrationRef.current?.isActive) {
				registrationRef.current.unregister();
				registrationRef.current = null;
			}
		};
	}, [hotkeyString]);
	if (registrationRef.current?.isActive) {
		registrationRef.current.callback = callback;
		registrationRef.current.setOptions(optionsWithoutTarget);
	}
}
//#endregion
//#region ../../node_modules/.pnpm/@tanstack+react-hotkeys@0.1_920c04900dbac09f561fc4415ea8a307/node_modules/@tanstack/react-hotkeys/dist/useHotkeys.js
/**
* React hook for registering multiple keyboard hotkeys at once.
*
* Uses the singleton HotkeyManager for efficient event handling.
* Accepts a dynamic array of hotkey definitions, making it safe to use
* with variable-length lists without violating the rules of hooks.
*
* Options are merged in this order:
* HotkeysProvider defaults < commonOptions < per-definition options
*
* Callbacks and options are synced on every render to avoid stale closures.
*
* @param hotkeys - Array of hotkey definitions to register
* @param commonOptions - Shared options applied to all hotkeys (overridden by per-definition options).
*   Per-row `enabled: false` still registers that hotkey: `HotkeyManager` suppresses execution only (the row
*   stays in the store and appears in TanStack Hotkeys devtools). Toggling `enabled` updates the existing handle
*   via `setOptions` (no unregister/re-register churn).
*
* @example
* ```tsx
* function Editor() {
*   useHotkeys([
*     { hotkey: 'Mod+S', callback: () => save() },
*     { hotkey: 'Mod+Z', callback: () => undo() },
*     { hotkey: 'Escape', callback: () => close() },
*   ])
* }
* ```
*
* @example
* ```tsx
* function MenuShortcuts({ items }) {
*   // Dynamic hotkeys from data -- safe because it's a single hook call
*   useHotkeys(
*     items.map((item) => ({
*       hotkey: item.shortcut,
*       callback: item.action,
*       options: { enabled: item.enabled },
*     })),
*     { preventDefault: true },
*   )
* }
* ```
*/
function useHotkeys(hotkeys, commonOptions = {}) {
	const defaultOptions = useDefaultHotkeysOptions().hotkey;
	const manager = getHotkeyManager();
	const platform = commonOptions.platform ?? defaultOptions?.platform ?? detectPlatform();
	const registrationsRef = (0, import_react.useRef)(/* @__PURE__ */ new Map());
	const hotkeysRef = (0, import_react.useRef)(hotkeys);
	const hotkeyStringsRef = (0, import_react.useRef)([]);
	const commonOptionsRef = (0, import_react.useRef)(commonOptions);
	const defaultOptionsRef = (0, import_react.useRef)(defaultOptions);
	const managerRef = (0, import_react.useRef)(manager);
	const hotkeyStrings = hotkeys.map((def) => normalizeRegisterableHotkey(def.hotkey, platform));
	hotkeysRef.current = hotkeys;
	hotkeyStringsRef.current = hotkeyStrings;
	commonOptionsRef.current = commonOptions;
	defaultOptionsRef.current = defaultOptions;
	managerRef.current = manager;
	(0, import_react.useEffect)(() => {
		const prevRegistrations = registrationsRef.current;
		const nextRegistrations = /* @__PURE__ */ new Map();
		const rows = [];
		for (let i = 0; i < hotkeysRef.current.length; i++) {
			const def = hotkeysRef.current[i];
			const hotkeyStr = hotkeyStringsRef.current[i];
			const mergedOptions = {
				...defaultOptionsRef.current,
				...commonOptionsRef.current,
				...def.options
			};
			const resolvedTarget = isRef(mergedOptions.target) ? mergedOptions.target.current : mergedOptions.target ?? (typeof document !== "undefined" ? document : null);
			if (!resolvedTarget) continue;
			const registrationKey = `${i}:${hotkeyStr}`;
			rows.push({
				registrationKey,
				def,
				hotkeyStr,
				mergedOptions,
				resolvedTarget
			});
		}
		const nextKeys = new Set(rows.map((r) => r.registrationKey));
		for (const [key, record] of prevRegistrations) if (!nextKeys.has(key) && record.handle.isActive) record.handle.unregister();
		for (const row of rows) {
			const { registrationKey, def, hotkeyStr, mergedOptions, resolvedTarget } = row;
			const existing = prevRegistrations.get(registrationKey);
			if (existing?.handle.isActive && existing.target === resolvedTarget) {
				nextRegistrations.set(registrationKey, existing);
				continue;
			}
			if (existing?.handle.isActive) existing.handle.unregister();
			const handle = managerRef.current.register(hotkeyStr, def.callback, {
				...mergedOptions,
				target: resolvedTarget
			});
			nextRegistrations.set(registrationKey, {
				handle,
				target: resolvedTarget
			});
		}
		registrationsRef.current = nextRegistrations;
	});
	(0, import_react.useEffect)(() => {
		return () => {
			for (const { handle } of registrationsRef.current.values()) if (handle.isActive) handle.unregister();
			registrationsRef.current = /* @__PURE__ */ new Map();
		};
	}, []);
	for (let i = 0; i < hotkeys.length; i++) {
		const def = hotkeys[i];
		const hotkeyStr = hotkeyStrings[i];
		const registrationKey = `${i}:${hotkeyStr}`;
		const handle = registrationsRef.current.get(registrationKey)?.handle;
		if (handle?.isActive) {
			handle.callback = def.callback;
			const { target: _target, ...optionsWithoutTarget } = {
				...defaultOptions,
				...commonOptions,
				...def.options
			};
			handle.setOptions(optionsWithoutTarget);
		}
	}
}
//#endregion
export { useHotkey as n, HotkeysProvider as r, useHotkeys as t };
