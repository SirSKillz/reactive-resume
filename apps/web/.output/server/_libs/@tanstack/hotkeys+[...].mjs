//#region ../../node_modules/.pnpm/@tanstack+hotkeys@0.8.0/node_modules/@tanstack/hotkeys/dist/constants.js
/**
* Detects the current platform based on browser navigator properties.
*
* Used internally to resolve platform-adaptive modifiers like 'Mod' (Command on Mac,
* Control elsewhere) and for platform-specific hotkey formatting.
*
* @returns The detected platform: 'mac', 'windows', or 'linux'
* @remarks Defaults to 'linux' in SSR environments where navigator is undefined
*
* @example
* ```ts
* const platform = detectPlatform() // 'mac' | 'windows' | 'linux'
* const modifier = resolveModifier('Mod', platform) // 'Meta' on Mac, 'Control' elsewhere
* ```
*/
function detectPlatform() {
	if (typeof navigator === "undefined") return "linux";
	const platform = navigator.platform?.toLowerCase() ?? "";
	const userAgent = navigator.userAgent?.toLowerCase() ?? "";
	if (platform.includes("mac") || userAgent.includes("mac")) return "mac";
	if (platform.includes("win") || userAgent.includes("win")) return "windows";
	return "linux";
}
/**
* Canonical order for modifiers in normalized hotkey strings.
*
* Defines the standard order in which modifiers should appear when formatting
* hotkeys. This ensures consistent, predictable output across the library.
*
* Order: Control → Alt → Shift → Meta
*
* @example
* ```ts
* // Input: 'Shift+Control+Meta+S'
* // Normalized: 'Control+Alt+Shift+Meta+S' (following MODIFIER_ORDER)
* ```
*/
var MODIFIER_ORDER = [
	"Control",
	"Alt",
	"Shift",
	"Meta"
];
new Set(MODIFIER_ORDER);
/**
* Maps modifier key aliases to their canonical form or platform-adaptive 'Mod'.
*
* This map allows users to write hotkeys using various aliases (e.g., 'Ctrl', 'Cmd', 'Option')
* which are then normalized to canonical names ('Control', 'Meta', 'Alt') or the
* platform-adaptive 'Mod' token.
*
* The 'Mod' and 'CommandOrControl' aliases are resolved at runtime via `resolveModifier()`
* based on the detected platform (Command on Mac, Control elsewhere).
*
* @remarks Case-insensitive lookups are supported via lowercase variants
*
* @example
* ```ts
* MODIFIER_ALIASES['Ctrl'] // 'Control'
* MODIFIER_ALIASES['Cmd'] // 'Meta'
* MODIFIER_ALIASES['Mod'] // 'Mod' (resolved at runtime)
* ```
*/
var MODIFIER_ALIASES = {
	Control: "Control",
	Ctrl: "Control",
	control: "Control",
	ctrl: "Control",
	Shift: "Shift",
	shift: "Shift",
	Alt: "Alt",
	Option: "Alt",
	alt: "Alt",
	option: "Alt",
	Command: "Meta",
	Cmd: "Meta",
	Meta: "Meta",
	command: "Meta",
	cmd: "Meta",
	meta: "Meta",
	OS: "Meta",
	os: "Meta",
	Win: "Meta",
	win: "Meta",
	CommandOrControl: "Mod",
	Mod: "Mod",
	commandorcontrol: "Mod",
	mod: "Mod"
};
/**
* Resolves the platform-adaptive 'Mod' modifier to the appropriate canonical modifier.
*
* The 'Mod' token represents the "primary modifier" on each platform:
* - macOS: 'Meta' (Command key ⌘)
* - Windows/Linux: 'Control' (Ctrl key)
*
* This enables cross-platform hotkey definitions like 'Mod+S' that automatically
* map to Command+S on Mac and Ctrl+S on Windows/Linux.
*
* @param modifier - The modifier to resolve. If 'Mod', resolves based on platform.
* @param platform - The target platform. Defaults to auto-detection.
* @returns The canonical modifier name ('Control', 'Shift', 'Alt', or 'Meta')
*
* @example
* ```ts
* resolveModifier('Mod', 'mac') // 'Meta'
* resolveModifier('Mod', 'windows') // 'Control'
* resolveModifier('Control', 'mac') // 'Control' (unchanged)
* ```
*/
function resolveModifier(modifier, platform = detectPlatform()) {
	if (modifier === "Mod") return platform === "mac" ? "Meta" : "Control";
	return modifier;
}
/**
* Set of all valid letter keys (A-Z).
*
* Used for validation and type checking. Letter keys are matched case-insensitively
* in hotkey matching, but normalized to uppercase in canonical form.
*/
var LETTER_KEYS = new Set([
	"A",
	"B",
	"C",
	"D",
	"E",
	"F",
	"G",
	"H",
	"I",
	"J",
	"K",
	"L",
	"M",
	"N",
	"O",
	"P",
	"Q",
	"R",
	"S",
	"T",
	"U",
	"V",
	"W",
	"X",
	"Y",
	"Z"
]);
/**
* Set of all valid number keys (0-9).
*
* Note: Number keys are affected by Shift (Shift+1 → '!' on US layout),
* so they're excluded from Shift-based hotkey combinations to avoid
* layout-dependent behavior.
*/
var NUMBER_KEYS = new Set([
	"0",
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9"
]);
/**
* Set of all valid function keys (F1-F12).
*
* Function keys are commonly used for system shortcuts (e.g., F12 for DevTools,
* Alt+F4 to close windows) and application-specific commands.
*/
var FUNCTION_KEYS = new Set([
	"F1",
	"F2",
	"F3",
	"F4",
	"F5",
	"F6",
	"F7",
	"F8",
	"F9",
	"F10",
	"F11",
	"F12"
]);
/**
* Set of all valid navigation keys for cursor movement and document navigation.
*
* Includes arrow keys, Home/End (line navigation), and PageUp/PageDown (page navigation).
* These keys are commonly combined with modifiers for selection (Shift+ArrowUp) or
* navigation shortcuts (Alt+ArrowLeft for back).
*/
var NAVIGATION_KEYS = new Set([
	"ArrowUp",
	"ArrowDown",
	"ArrowLeft",
	"ArrowRight",
	"Home",
	"End",
	"PageUp",
	"PageDown"
]);
/**
* Set of all valid editing and special keys.
*
* Includes keys commonly used for text editing (Enter, Backspace, Delete, Tab) and
* special actions (Escape, Space). These keys are frequently combined with modifiers
* for editor shortcuts (Mod+Enter to submit, Shift+Tab to go back).
*/
var EDITING_KEYS = new Set([
	"Enter",
	"Escape",
	"Space",
	"Tab",
	"Backspace",
	"Delete"
]);
/**
* Set of all valid punctuation keys commonly used in keyboard shortcuts.
*
* These are the literal characters as they appear in `KeyboardEvent.key` (layout-dependent,
* typically US keyboard layout). Common shortcuts include:
* - `Mod+/` - Toggle comment
* - `Mod+[` / `Mod+]` - Indent/outdent
* - `Mod+=` / `Mod+-` - Zoom in/out
*
* Note: Punctuation keys are affected by Shift (Shift+',' → '<' on US layout),
* so they're excluded from Shift-based hotkey combinations to avoid layout-dependent behavior.
*/
var PUNCTUATION_KEYS = new Set([
	"/",
	"[",
	"]",
	"\\",
	"=",
	"-",
	",",
	".",
	";",
	"`"
]);
/**
* Maps `KeyboardEvent.code` values for punctuation keys to their canonical characters.
*
* On macOS, holding the Option (Alt) key transforms punctuation keys into special characters
* (e.g., Option+Minus → en-dash '–'), causing `event.key` to differ from the expected character.
* However, `event.code` still reports the physical key (e.g., 'Minus'). This map enables
* falling back to `event.code` for punctuation keys, similar to the existing `Key*`/`Digit*`
* fallbacks for letters and digits.
*/
var PUNCTUATION_CODE_MAP = {
	Backquote: "`",
	Backslash: "\\",
	BracketLeft: "[",
	BracketRight: "]",
	Comma: ",",
	Equal: "=",
	Minus: "-",
	Period: ".",
	Semicolon: ";",
	Slash: "/"
};
new Set([
	...LETTER_KEYS,
	...NUMBER_KEYS,
	...FUNCTION_KEYS,
	...NAVIGATION_KEYS,
	...EDITING_KEYS,
	...PUNCTUATION_KEYS
]);
/**
* Maps key name aliases to their canonical form.
*
* Handles common variations and alternative names for keys to provide a more
* forgiving API. For example, users can write 'Esc', 'esc', or 'escape' and
* they'll all normalize to 'Escape'.
*
* This map is used internally by `normalizeKeyName()` to convert user input
* into the canonical key names used throughout the library.
*
* @remarks Case-insensitive lookups are supported via lowercase variants
*
* @example
* ```ts
* KEY_ALIASES['Esc'] // 'Escape'
* KEY_ALIASES['Del'] // 'Delete'
* KEY_ALIASES['Up'] // 'ArrowUp'
* ```
*/
var KEY_ALIASES = {
	Esc: "Escape",
	esc: "Escape",
	escape: "Escape",
	Return: "Enter",
	return: "Enter",
	enter: "Enter",
	" ": "Space",
	space: "Space",
	Spacebar: "Space",
	spacebar: "Space",
	tab: "Tab",
	backspace: "Backspace",
	Del: "Delete",
	del: "Delete",
	delete: "Delete",
	Up: "ArrowUp",
	up: "ArrowUp",
	arrowup: "ArrowUp",
	Down: "ArrowDown",
	down: "ArrowDown",
	arrowdown: "ArrowDown",
	Left: "ArrowLeft",
	left: "ArrowLeft",
	arrowleft: "ArrowLeft",
	Right: "ArrowRight",
	right: "ArrowRight",
	arrowright: "ArrowRight",
	home: "Home",
	end: "End",
	pageup: "PageUp",
	pagedown: "PageDown",
	PgUp: "PageUp",
	PgDn: "PageDown",
	pgup: "PageUp",
	pgdn: "PageDown"
};
/**
* Normalizes a key name to its canonical form.
*
* Converts various key name formats (aliases, case variations) into the standard
* canonical names used throughout the library. This enables a more forgiving API
* where users can write keys in different ways and still get correct behavior.
*
* Normalization rules:
* 1. Check aliases first (e.g., 'Esc' → 'Escape', 'Del' → 'Delete')
* 2. Single letters → uppercase (e.g., 'a' → 'A', 's' → 'S')
* 3. Function keys → uppercase (e.g., 'f1' → 'F1', 'F12' → 'F12')
* 4. Other keys → returned as-is (already canonical or unknown)
*
* @param key - The key name to normalize (can be an alias, lowercase, etc.)
* @returns The canonical key name
*
* @example
* ```ts
* normalizeKeyName('esc') // 'Escape'
* normalizeKeyName('a') // 'A'
* normalizeKeyName('f1') // 'F1'
* normalizeKeyName('ArrowUp') // 'ArrowUp' (already canonical)
* ```
*/
function isSingleLetterKey(key) {
	return /^\p{Letter}$/u.test(key);
}
/**
* Normalizes a key name to its canonical form.
*
* @param key - The key name to normalize (can be an alias, lowercase, etc.)
* @returns The canonical key name
*
* @example
* ```ts
* normalizeKeyName('esc') // 'Escape'
* normalizeKeyName('a') // 'A'
* normalizeKeyName('f1') // 'F1'
* normalizeKeyName('ArrowUp') // 'ArrowUp' (already canonical)
* ```
*/
function normalizeKeyName(key) {
	if (!key) return "";
	if (key in KEY_ALIASES) return KEY_ALIASES[key];
	if (isSingleLetterKey(key)) {
		const upper = key.toUpperCase();
		return upper.length === 1 ? upper : key;
	}
	const upperKey = key.toUpperCase();
	if (/^F([1-9]|1[0-2])$/.test(upperKey)) return upperKey;
	return key;
}
//#endregion
//#region ../../node_modules/.pnpm/@tanstack+hotkeys@0.8.0/node_modules/@tanstack/hotkeys/dist/parse.js
/**
* Parses a hotkey string into its component parts.
*
* @param hotkey - The hotkey string to parse (e.g., 'Mod+Shift+S')
* @param platform - The target platform for resolving 'Mod' (defaults to auto-detection)
* @returns A ParsedHotkey object with the key and modifier flags
*
* @example
* ```ts
* parseHotkey('Mod+S') // On Mac: { key: 'S', ctrl: false, shift: false, alt: false, meta: true, modifiers: ['Meta'] }
* parseHotkey('Mod+S') // On Windows: { key: 'S', ctrl: true, shift: false, alt: false, meta: false, modifiers: ['Control'] }
* parseHotkey('Control+Shift+A') // { key: 'A', ctrl: true, shift: true, alt: false, meta: false, modifiers: ['Control', 'Shift'] }
* ```
*/
function parseHotkey(hotkey, platform = detectPlatform()) {
	const parts = hotkey.split("+");
	const modifiers = /* @__PURE__ */ new Set();
	let key = "";
	for (let i = 0; i < parts.length; i++) {
		const part = parts[i].trim();
		if (i === parts.length - 1) key = normalizeKeyName(part);
		else {
			const alias = MODIFIER_ALIASES[part] ?? MODIFIER_ALIASES[part.toLowerCase()];
			if (alias) {
				const resolved = resolveModifier(alias, platform);
				modifiers.add(resolved);
			} else if (parts.length === 1) key = normalizeKeyName(part);
		}
	}
	if (!key && parts.length > 0) key = normalizeKeyName(parts[parts.length - 1].trim());
	return {
		key,
		ctrl: modifiers.has("Control"),
		shift: modifiers.has("Shift"),
		alt: modifiers.has("Alt"),
		meta: modifiers.has("Meta"),
		modifiers: MODIFIER_ORDER.filter((m) => modifiers.has(m))
	};
}
/**
* Converts a RawHotkey object to a ParsedHotkey.
* Optional modifier booleans default to false; modifiers array is derived from them.
* When `mod` is true, it is resolved to Control or Meta based on platform.
*
* @param raw - The raw hotkey object
* @param platform - The target platform for resolving 'Mod' (defaults to auto-detection)
* @returns A ParsedHotkey suitable for matching and formatting
*
* @example
* ```ts
* rawHotkeyToParsedHotkey({ key: 'Escape' })
* // { key: 'Escape', ctrl: false, shift: false, alt: false, meta: false, modifiers: [] }
*
* rawHotkeyToParsedHotkey({ key: 'S', mod: true }, 'mac')
* // { key: 'S', ctrl: false, shift: false, alt: false, meta: true, modifiers: ['Meta'] }
*
* rawHotkeyToParsedHotkey({ key: 'S', mod: true, shift: true }, 'windows')
* // { key: 'S', ctrl: true, shift: true, alt: false, meta: false, modifiers: ['Control', 'Shift'] }
* ```
*/
function rawHotkeyToParsedHotkey(raw, platform = detectPlatform()) {
	let ctrl = raw.ctrl ?? false;
	const shift = raw.shift ?? false;
	const alt = raw.alt ?? false;
	let meta = raw.meta ?? false;
	if (raw.mod) if (resolveModifier("Mod", platform) === "Control") ctrl = true;
	else meta = true;
	const modifiers = MODIFIER_ORDER.filter((m) => {
		switch (m) {
			case "Control": return ctrl;
			case "Shift": return shift;
			case "Alt": return alt;
			case "Meta": return meta;
			default: return false;
		}
	});
	return {
		key: raw.key,
		ctrl,
		shift,
		alt,
		meta,
		modifiers
	};
}
/**
* Serializes a parsed hotkey to the canonical string form used for registration
* and storage: `Mod` first when the platform allows, then `Alt`, then `Shift`;
* otherwise full `Control+Alt+Shift+Meta` order.
*/
function normalizedHotkeyStringFromParsed(parsed, platform) {
	const canUseMod = platform === "mac" ? parsed.meta && !parsed.ctrl : parsed.ctrl && !parsed.meta;
	const parts = [];
	if (canUseMod) {
		parts.push("Mod");
		if (parsed.alt) parts.push("Alt");
		if (parsed.shift) parts.push("Shift");
	} else for (const modifier of MODIFIER_ORDER) if (parsed.modifiers.includes(modifier)) parts.push(modifier);
	parts.push(normalizeKeyName(parsed.key));
	return parts.join("+");
}
/**
* Normalizes a hotkey string to its canonical form.
*
* - When `Mod` is allowed for the platform (Command on Mac without Control;
*   Control on Windows/Linux without Meta): emits `Mod`, then `Alt`, then `Shift`,
*   then the key (e.g. `Mod+Shift+E`, `Mod+S`).
* - Otherwise: literal modifiers in `Control+Alt+Shift+Meta` order, then the key.
* - Resolves aliases and normalizes key casing (e.g. `esc` → `Escape`, `a` → `A`).
*
* @param hotkey - The hotkey string to normalize
* @param platform - The target platform for resolving `Mod` (defaults to auto-detection)
* @returns The normalized hotkey string
*
* @example
* ```ts
* normalizeHotkey('shift+meta+e', 'mac') // 'Mod+Shift+E'
* normalizeHotkey('ctrl+a', 'windows') // 'Mod+A'
* normalizeHotkey('esc') // 'Escape'
* ```
*/
function normalizeHotkey(hotkey, platform = detectPlatform()) {
	return normalizedHotkeyStringFromParsed(parseHotkey(hotkey, platform), platform);
}
/**
* Same canonical string as {@link normalizeHotkey}, but from an already-parsed hotkey.
*/
function normalizeHotkeyFromParsed(parsed, platform = detectPlatform()) {
	return normalizedHotkeyStringFromParsed(parsed, platform);
}
/**
* Normalizes a string or {@link RawHotkey} object to the same canonical hotkey string.
* Use this in framework adapters instead of branching on `formatHotkey(rawHotkeyToParsedHotkey(...))`.
*/
function normalizeRegisterableHotkey(hotkey, platform = detectPlatform()) {
	return typeof hotkey === "string" ? normalizeHotkey(hotkey, platform) : normalizeHotkeyFromParsed(rawHotkeyToParsedHotkey(hotkey, platform), platform);
}
//#endregion
//#region ../../node_modules/.pnpm/@tanstack+hotkeys@0.8.0/node_modules/@tanstack/hotkeys/dist/format.js
/**
* Converts a ParsedHotkey back to a hotkey string.
*
* @param parsed - The parsed hotkey object
* @returns A hotkey string in canonical form
*
* @example
* ```ts
* formatHotkey({ key: 'S', ctrl: true, shift: true, alt: false, meta: false, modifiers: ['Control', 'Shift'] })
* // Returns: 'Control+Shift+S'
* ```
*/
function formatHotkey(parsed) {
	const parts = [];
	for (const modifier of MODIFIER_ORDER) if (parsed.modifiers.includes(modifier)) parts.push(modifier);
	parts.push(parsed.key);
	return parts.join("+");
}
//#endregion
//#region ../../node_modules/.pnpm/@tanstack+hotkeys@0.8.0/node_modules/@tanstack/hotkeys/dist/match.js
/**
* Checks if a KeyboardEvent matches a hotkey.
*
* Uses the `key` property from KeyboardEvent for matching, with a fallback to `code`
* for letter keys, digit keys (0-9), and punctuation keys when `key` produces special
* characters (e.g., macOS Option+letter, Shift+number, or Option+punctuation).
* Letter keys are matched case-insensitively.
*
* Also handles "dead key" events where `event.key` is `'Dead'` instead of the expected
* character. This commonly occurs on macOS with Option+letter combinations (e.g., Option+E,
* Option+I, Option+U, Option+N) and on Windows/Linux with international keyboard layouts.
* In these cases, `event.code` is used to determine the physical key.
*
* @param event - The KeyboardEvent to check
* @param hotkey - The hotkey string or ParsedHotkey to match against
* @param platform - The target platform for resolving 'Mod' (defaults to auto-detection)
* @returns True if the event matches the hotkey
*
* @example
* ```ts
* document.addEventListener('keydown', (event) => {
*   if (matchesKeyboardEvent(event, 'Mod+S')) {
*     event.preventDefault()
*     handleSave()
*   }
* })
* ```
*/
function matchesKeyboardEvent(event, hotkey, platform = detectPlatform()) {
	const parsed = typeof hotkey === "string" ? parseHotkey(hotkey, platform) : hotkey;
	if (event.ctrlKey !== parsed.ctrl) return false;
	if (event.shiftKey !== parsed.shift) return false;
	if (event.altKey !== parsed.alt) return false;
	if (event.metaKey !== parsed.meta) return false;
	const eventKey = normalizeKeyName(event.key);
	const hotkeyKey = parsed.key;
	if (eventKey !== "Dead" && eventKey.length === 1 && hotkeyKey.length === 1) {
		if (eventKey.toUpperCase() === hotkeyKey.toUpperCase()) return true;
		if (isSingleLetterKey(eventKey) && (/^[A-Za-z]$/.test(eventKey) || !event.altKey)) return false;
	}
	if (event.code && (eventKey === "Dead" || eventKey.length === 1 && hotkeyKey.length === 1)) {
		if (event.code.startsWith("Key")) {
			const codeLetter = event.code.slice(3);
			if (codeLetter.length === 1 && /^[A-Za-z]$/.test(codeLetter)) return codeLetter.toUpperCase() === hotkeyKey.toUpperCase();
		}
		if (event.code.startsWith("Digit")) {
			const codeDigit = event.code.slice(5);
			if (codeDigit.length === 1 && /^[0-9]$/.test(codeDigit)) return codeDigit === hotkeyKey;
		}
		if (event.code in PUNCTUATION_CODE_MAP) return PUNCTUATION_CODE_MAP[event.code] === hotkeyKey;
		return false;
	}
	return eventKey === hotkeyKey;
}
//#endregion
//#region ../../node_modules/.pnpm/@tanstack+hotkeys@0.8.0/node_modules/@tanstack/hotkeys/dist/manager.utils.js
/**
* Default options for hotkey/sequence registration.
* Omitted: platform, target (resolved at registration), requireReset (HotkeyManager only).
*/
var defaultHotkeyOptions = {
	preventDefault: true,
	stopPropagation: true,
	eventType: "keydown",
	enabled: true,
	ignoreInputs: true,
	conflictBehavior: "warn"
};
/**
* Computes the default ignoreInputs value based on the hotkey.
* Ctrl/Meta shortcuts and Escape fire in inputs; single keys and Shift/Alt combos are ignored.
*/
function getDefaultIgnoreInputs(parsedHotkey) {
	if (parsedHotkey.ctrl || parsedHotkey.meta) return false;
	if (parsedHotkey.key === "Escape") return false;
	return true;
}
/**
* Checks if an element is an input-like element that should be ignored for hotkeys.
*
* This includes:
* - HTMLInputElement (all input types except button, submit, reset)
* - HTMLTextAreaElement
* - HTMLSelectElement
* - Elements with contentEditable enabled
*
* Button-type inputs (button, submit, reset) are excluded so hotkeys like
* Mod+S and Escape fire when the user has tabbed to a form button.
*/
function isInputElement(element) {
	if (!element) return false;
	if (element instanceof HTMLInputElement) {
		const type = element.type.toLowerCase();
		if (type === "button" || type === "submit" || type === "reset") return false;
		return true;
	}
	if (element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement) return true;
	if (element instanceof HTMLElement && element.isContentEditable) return true;
	return false;
}
/**
* Returns the focused element for the document associated with where hotkey
* listeners are attached (listener root). Use this instead of the global
* `document.activeElement` so registrations scoped to an iframe (or another
* document) read focus from the correct tree.
*/
function getActiveElementForListenerTarget(target) {
	if (typeof document === "undefined") return null;
	if (typeof Document !== "undefined" && target instanceof Document || typeof Node !== "undefined" && target.nodeType === Node.DOCUMENT_NODE) return target.activeElement;
	if (typeof HTMLElement !== "undefined" && target instanceof HTMLElement) return target.ownerDocument.activeElement ?? null;
	return target.document.activeElement ?? null;
}
/**
* Returns whether an event should be ignored because it originated from an
* input-like element other than the registration target.
*
* This checks:
* - the currently focused element for the listener target
* - the event's composed path (for shadow DOM)
* - the event target as a final fallback
*/
function shouldIgnoreInputEvent(event, listenerTarget, registrationTarget) {
	const focused = getActiveElementForListenerTarget(listenerTarget);
	if (focused && isInputElement(focused) && focused !== registrationTarget) return true;
	if (event.composedPath().some((element) => isInputElement(element) && element !== registrationTarget)) return true;
	return isInputElement(event.target) && event.target !== registrationTarget;
}
/**
* Checks if an event is for the given target (originated from or bubbled to it).
*
* For document/window targets, also accepts document.documentElement as currentTarget
* to handle Brave and other browsers where currentTarget may be documentElement
* instead of document when listeners are attached to document.
*/
function isEventForTarget(event, target) {
	if (target === document || target === window) return event.currentTarget === target || event.currentTarget === document.documentElement;
	if (target === window) return event.currentTarget === window || event.currentTarget === document || event.currentTarget === document.documentElement;
	if (target instanceof HTMLElement) {
		if (event.currentTarget === target) return true;
		if (event.target instanceof Node && target.contains(event.target)) return true;
	}
	return false;
}
/**
* Handles conflicts between registrations based on conflict behavior.
*
* @param conflictingId - The ID of the conflicting registration
* @param keyDisplay - Display string for the conflicting key/sequence (for error messages)
* @param conflictBehavior - How to handle the conflict
* @param unregister - Function to unregister by ID
*/
function handleConflict(conflictingId, keyDisplay, conflictBehavior, unregister) {
	if (conflictBehavior === "allow") return;
	if (conflictBehavior === "warn") {
		console.warn(`'${keyDisplay}' is already registered. Multiple handlers will be triggered. Use conflictBehavior: 'replace' to replace the existing handler, or conflictBehavior: 'allow' to suppress this warning.`);
		return;
	}
	if (conflictBehavior === "error") throw new Error(`'${keyDisplay}' is already registered. Use conflictBehavior: 'replace' to replace the existing handler, or conflictBehavior: 'allow' to allow multiple registrations.`);
	unregister(conflictingId);
}
//#endregion
//#region ../../node_modules/.pnpm/@tanstack+store@0.11.0/node_modules/@tanstack/store/dist/alien.js
var ReactiveFlags = /* @__PURE__ */ function(ReactiveFlags) {
	ReactiveFlags[ReactiveFlags["None"] = 0] = "None";
	ReactiveFlags[ReactiveFlags["Mutable"] = 1] = "Mutable";
	ReactiveFlags[ReactiveFlags["Watching"] = 2] = "Watching";
	ReactiveFlags[ReactiveFlags["RecursedCheck"] = 4] = "RecursedCheck";
	ReactiveFlags[ReactiveFlags["Recursed"] = 8] = "Recursed";
	ReactiveFlags[ReactiveFlags["Dirty"] = 16] = "Dirty";
	ReactiveFlags[ReactiveFlags["Pending"] = 32] = "Pending";
	return ReactiveFlags;
}({});
/* @__NO_SIDE_EFFECTS__ */
function createReactiveSystem({ update, notify, unwatched }) {
	return {
		link,
		unlink,
		propagate,
		checkDirty,
		shallowPropagate
	};
	function link(dep, sub, version) {
		const prevDep = sub.depsTail;
		if (prevDep !== void 0 && prevDep.dep === dep) return;
		const nextDep = prevDep !== void 0 ? prevDep.nextDep : sub.deps;
		if (nextDep !== void 0 && nextDep.dep === dep) {
			nextDep.version = version;
			sub.depsTail = nextDep;
			return;
		}
		const prevSub = dep.subsTail;
		if (prevSub !== void 0 && prevSub.version === version && prevSub.sub === sub) return;
		const newLink = sub.depsTail = dep.subsTail = {
			version,
			dep,
			sub,
			prevDep,
			nextDep,
			prevSub,
			nextSub: void 0
		};
		if (nextDep !== void 0) nextDep.prevDep = newLink;
		if (prevDep !== void 0) prevDep.nextDep = newLink;
		else sub.deps = newLink;
		if (prevSub !== void 0) prevSub.nextSub = newLink;
		else dep.subs = newLink;
	}
	function unlink(link, sub = link.sub) {
		const dep = link.dep;
		const prevDep = link.prevDep;
		const nextDep = link.nextDep;
		const nextSub = link.nextSub;
		const prevSub = link.prevSub;
		if (nextDep !== void 0) nextDep.prevDep = prevDep;
		else sub.depsTail = prevDep;
		if (prevDep !== void 0) prevDep.nextDep = nextDep;
		else sub.deps = nextDep;
		if (nextSub !== void 0) nextSub.prevSub = prevSub;
		else dep.subsTail = prevSub;
		if (prevSub !== void 0) prevSub.nextSub = nextSub;
		else if ((dep.subs = nextSub) === void 0) unwatched(dep);
		return nextDep;
	}
	function propagate(link) {
		let next = link.nextSub;
		let stack;
		top: do {
			const sub = link.sub;
			let flags = sub.flags;
			if (!(flags & (ReactiveFlags.RecursedCheck | ReactiveFlags.Recursed | ReactiveFlags.Dirty | ReactiveFlags.Pending))) sub.flags = flags | ReactiveFlags.Pending;
			else if (!(flags & (ReactiveFlags.RecursedCheck | ReactiveFlags.Recursed))) flags = ReactiveFlags.None;
			else if (!(flags & ReactiveFlags.RecursedCheck)) sub.flags = flags & ~ReactiveFlags.Recursed | ReactiveFlags.Pending;
			else if (!(flags & (ReactiveFlags.Dirty | ReactiveFlags.Pending)) && isValidLink(link, sub)) {
				sub.flags = flags | (ReactiveFlags.Recursed | ReactiveFlags.Pending);
				flags &= ReactiveFlags.Mutable;
			} else flags = ReactiveFlags.None;
			if (flags & ReactiveFlags.Watching) notify(sub);
			if (flags & ReactiveFlags.Mutable) {
				const subSubs = sub.subs;
				if (subSubs !== void 0) {
					const nextSub = (link = subSubs).nextSub;
					if (nextSub !== void 0) {
						stack = {
							value: next,
							prev: stack
						};
						next = nextSub;
					}
					continue;
				}
			}
			if ((link = next) !== void 0) {
				next = link.nextSub;
				continue;
			}
			while (stack !== void 0) {
				link = stack.value;
				stack = stack.prev;
				if (link !== void 0) {
					next = link.nextSub;
					continue top;
				}
			}
			break;
		} while (true);
	}
	function checkDirty(link, sub) {
		let stack;
		let checkDepth = 0;
		let dirty = false;
		top: do {
			const dep = link.dep;
			const flags = dep.flags;
			if (sub.flags & ReactiveFlags.Dirty) dirty = true;
			else if ((flags & (ReactiveFlags.Mutable | ReactiveFlags.Dirty)) === (ReactiveFlags.Mutable | ReactiveFlags.Dirty)) {
				if (update(dep)) {
					const subs = dep.subs;
					if (subs.nextSub !== void 0) shallowPropagate(subs);
					dirty = true;
				}
			} else if ((flags & (ReactiveFlags.Mutable | ReactiveFlags.Pending)) === (ReactiveFlags.Mutable | ReactiveFlags.Pending)) {
				if (link.nextSub !== void 0 || link.prevSub !== void 0) stack = {
					value: link,
					prev: stack
				};
				link = dep.deps;
				sub = dep;
				++checkDepth;
				continue;
			}
			if (!dirty) {
				const nextDep = link.nextDep;
				if (nextDep !== void 0) {
					link = nextDep;
					continue;
				}
			}
			while (checkDepth--) {
				const firstSub = sub.subs;
				const hasMultipleSubs = firstSub.nextSub !== void 0;
				if (hasMultipleSubs) {
					link = stack.value;
					stack = stack.prev;
				} else link = firstSub;
				if (dirty) {
					if (update(sub)) {
						if (hasMultipleSubs) shallowPropagate(firstSub);
						sub = link.sub;
						continue;
					}
					dirty = false;
				} else sub.flags &= ~ReactiveFlags.Pending;
				sub = link.sub;
				const nextDep = link.nextDep;
				if (nextDep !== void 0) {
					link = nextDep;
					continue top;
				}
			}
			return dirty;
		} while (true);
	}
	function shallowPropagate(link) {
		do {
			const sub = link.sub;
			const flags = sub.flags;
			if ((flags & (ReactiveFlags.Pending | ReactiveFlags.Dirty)) === ReactiveFlags.Pending) {
				sub.flags = flags | ReactiveFlags.Dirty;
				if ((flags & (ReactiveFlags.Watching | ReactiveFlags.RecursedCheck)) === ReactiveFlags.Watching) notify(sub);
			}
		} while ((link = link.nextSub) !== void 0);
	}
	function isValidLink(checkLink, sub) {
		let link = sub.depsTail;
		while (link !== void 0) {
			if (link === checkLink) return true;
			link = link.prevDep;
		}
		return false;
	}
}
//#endregion
//#region ../../node_modules/.pnpm/@tanstack+store@0.11.0/node_modules/@tanstack/store/dist/atom.js
function toObserver(nextHandler, errorHandler, completionHandler) {
	const isObserver = typeof nextHandler === "object";
	const self = isObserver ? nextHandler : void 0;
	return {
		next: (isObserver ? nextHandler.next : nextHandler)?.bind(self),
		error: (isObserver ? nextHandler.error : errorHandler)?.bind(self),
		complete: (isObserver ? nextHandler.complete : completionHandler)?.bind(self)
	};
}
var queuedEffects = [];
var cycle = 0;
var { link, unlink, propagate, checkDirty, shallowPropagate } = /* @__PURE__ */ createReactiveSystem({
	update(atom) {
		return atom._update();
	},
	notify(effect) {
		queuedEffects[queuedEffectsLength++] = effect;
		effect.flags &= ~ReactiveFlags.Watching;
	},
	unwatched(atom) {
		if (atom.depsTail !== void 0) {
			atom.depsTail = void 0;
			atom.flags = ReactiveFlags.Mutable | ReactiveFlags.Dirty;
			purgeDeps(atom);
		}
	}
});
var notifyIndex = 0;
var queuedEffectsLength = 0;
var activeSub;
var batchDepth = 0;
function purgeDeps(sub) {
	const depsTail = sub.depsTail;
	let dep = depsTail !== void 0 ? depsTail.nextDep : sub.deps;
	while (dep !== void 0) dep = unlink(dep, sub);
}
function flush() {
	if (batchDepth > 0) return;
	while (notifyIndex < queuedEffectsLength) {
		const effect = queuedEffects[notifyIndex];
		queuedEffects[notifyIndex++] = void 0;
		effect.notify();
	}
	notifyIndex = 0;
	queuedEffectsLength = 0;
}
function createAtom(valueOrFn, options) {
	const isComputed = typeof valueOrFn === "function";
	const getter = valueOrFn;
	const atom = {
		_snapshot: isComputed ? void 0 : valueOrFn,
		subs: void 0,
		subsTail: void 0,
		deps: void 0,
		depsTail: void 0,
		flags: isComputed ? ReactiveFlags.None : ReactiveFlags.Mutable,
		get() {
			if (activeSub !== void 0) link(atom, activeSub, cycle);
			return atom._snapshot;
		},
		subscribe(observerOrFn) {
			const obs = toObserver(observerOrFn);
			const observed = { current: false };
			const e = effect(() => {
				atom.get();
				if (!observed.current) observed.current = true;
				else obs.next?.(atom._snapshot);
			});
			return { unsubscribe: () => {
				e.stop();
			} };
		},
		_update(getValue) {
			const prevSub = activeSub;
			const compare = options?.compare ?? Object.is;
			if (isComputed) {
				activeSub = atom;
				++cycle;
				atom.depsTail = void 0;
			} else if (getValue === void 0) return false;
			if (isComputed) atom.flags = ReactiveFlags.Mutable | ReactiveFlags.RecursedCheck;
			try {
				const oldValue = atom._snapshot;
				const newValue = typeof getValue === "function" ? getValue(oldValue) : getValue === void 0 && isComputed ? getter(oldValue) : getValue;
				if (oldValue === void 0 || !compare(oldValue, newValue)) {
					atom._snapshot = newValue;
					return true;
				}
				return false;
			} finally {
				activeSub = prevSub;
				if (isComputed) atom.flags &= ~ReactiveFlags.RecursedCheck;
				purgeDeps(atom);
			}
		}
	};
	if (isComputed) {
		atom.flags = ReactiveFlags.Mutable | ReactiveFlags.Dirty;
		atom.get = function() {
			const flags = atom.flags;
			if (flags & ReactiveFlags.Dirty || flags & ReactiveFlags.Pending && checkDirty(atom.deps, atom)) {
				if (atom._update()) {
					const subs = atom.subs;
					if (subs !== void 0) shallowPropagate(subs);
				}
			} else if (flags & ReactiveFlags.Pending) atom.flags = flags & ~ReactiveFlags.Pending;
			if (activeSub !== void 0) link(atom, activeSub, cycle);
			return atom._snapshot;
		};
	} else atom.set = function(valueOrFn) {
		if (atom._update(valueOrFn)) {
			const subs = atom.subs;
			if (subs !== void 0) {
				propagate(subs);
				shallowPropagate(subs);
				flush();
			}
		}
	};
	return atom;
}
function effect(fn) {
	const run = () => {
		const prevSub = activeSub;
		activeSub = effectObj;
		++cycle;
		effectObj.depsTail = void 0;
		effectObj.flags = ReactiveFlags.Watching | ReactiveFlags.RecursedCheck;
		try {
			return fn();
		} finally {
			activeSub = prevSub;
			effectObj.flags &= ~ReactiveFlags.RecursedCheck;
			purgeDeps(effectObj);
		}
	};
	const effectObj = {
		deps: void 0,
		depsTail: void 0,
		subs: void 0,
		subsTail: void 0,
		flags: ReactiveFlags.Watching | ReactiveFlags.RecursedCheck,
		notify() {
			const flags = this.flags;
			if (flags & ReactiveFlags.Dirty || flags & ReactiveFlags.Pending && checkDirty(this.deps, this)) run();
			else this.flags = ReactiveFlags.Watching;
		},
		stop() {
			this.flags = ReactiveFlags.None;
			this.depsTail = void 0;
			purgeDeps(this);
		}
	};
	run();
	return effectObj;
}
//#endregion
//#region ../../node_modules/.pnpm/@tanstack+store@0.11.0/node_modules/@tanstack/store/dist/store.js
var Store = class {
	constructor(valueOrFn, actionsFactory) {
		this.atom = createAtom(valueOrFn);
		this.get = this.get.bind(this);
		this.setState = this.setState.bind(this);
		this.subscribe = this.subscribe.bind(this);
		if (actionsFactory) this.actions = actionsFactory(this);
	}
	setState(updater) {
		this.atom.set(updater);
	}
	get state() {
		return this.atom.get();
	}
	get() {
		return this.state;
	}
	subscribe(observerOrFn) {
		return this.atom.subscribe(toObserver(observerOrFn));
	}
};
//#endregion
//#region ../../node_modules/.pnpm/@tanstack+hotkeys@0.8.0/node_modules/@tanstack/hotkeys/dist/hotkey-manager.js
var registrationIdCounter = 0;
/**
* Generates a unique ID for hotkey registrations.
*/
function generateId() {
	return `hotkey_${++registrationIdCounter}`;
}
/**
* Singleton manager for hotkey registrations.
*
* This class provides a centralized way to register and manage keyboard hotkeys.
* It uses a single event listener for efficiency, regardless of how many hotkeys
* are registered.
*
* @example
* ```ts
* const manager = HotkeyManager.getInstance()
*
* const unregister = manager.register('Mod+S', (event, context) => {
*   console.log('Save triggered!')
* })
*
* // Later, to unregister:
* unregister()
* ```
*/
var HotkeyManager = class HotkeyManager {
	static #instance = null;
	#platform;
	#targetListeners = /* @__PURE__ */ new Map();
	#targetRegistrations = /* @__PURE__ */ new Map();
	constructor() {
		this.registrations = new Store(/* @__PURE__ */ new Map());
		this.#platform = detectPlatform();
	}
	/**
	* Gets the singleton instance of HotkeyManager.
	*/
	static getInstance() {
		if (!HotkeyManager.#instance) HotkeyManager.#instance = new HotkeyManager();
		return HotkeyManager.#instance;
	}
	/**
	* Resets the singleton instance. Useful for testing.
	*/
	static resetInstance() {
		if (HotkeyManager.#instance) {
			HotkeyManager.#instance.destroy();
			HotkeyManager.#instance = null;
		}
	}
	/**
	* Registers a hotkey handler and returns a handle for updating the registration.
	*
	* The returned handle allows updating the callback and options without
	* re-registering, which is useful for avoiding stale closures in React.
	*
	* @param hotkey - The hotkey string (e.g., 'Mod+S') or RawHotkey object
	* @param callback - The function to call when the hotkey is pressed
	* @param options - Options for the hotkey behavior
	* @returns A handle for managing the registration
	*
	* @example
	* ```ts
	* const handle = manager.register('Mod+S', callback)
	*
	* // Update callback without re-registering (avoids stale closures)
	* handle.callback = newCallback
	*
	* // Update options
	* handle.setOptions({ enabled: false })
	*
	* // Unregister when done
	* handle.unregister()
	* ```
	*/
	register(hotkey, callback, options = {}) {
		if (typeof document === "undefined" && !options.target) {
			let currentCallback = callback;
			return {
				id: generateId(),
				unregister: () => {},
				get callback() {
					return currentCallback;
				},
				set callback(newCallback) {
					currentCallback = newCallback;
				},
				setOptions: () => {},
				get isActive() {
					return false;
				}
			};
		}
		const id = generateId();
		const platform = options.platform ?? this.#platform;
		const parsedHotkey = typeof hotkey === "string" ? parseHotkey(hotkey, platform) : rawHotkeyToParsedHotkey(hotkey, platform);
		const hotkeyStr = typeof hotkey === "string" ? hotkey : formatHotkey(parsedHotkey);
		const target = options.target ?? document;
		const conflictBehavior = options.conflictBehavior ?? "warn";
		const conflictingRegistration = this.#findConflictingRegistration(hotkeyStr, target);
		if (conflictingRegistration) handleConflict(conflictingRegistration.id, hotkeyStr, conflictBehavior, (id) => this.#unregister(id));
		const resolvedIgnoreInputs = options.ignoreInputs ?? getDefaultIgnoreInputs(parsedHotkey);
		const registration = {
			id,
			hotkey: hotkeyStr,
			parsedHotkey,
			callback,
			options: {
				...defaultHotkeyOptions,
				requireReset: false,
				...options,
				platform,
				ignoreInputs: resolvedIgnoreInputs
			},
			hasFired: false,
			triggerCount: 0,
			target
		};
		this.registrations.setState((prev) => new Map(prev).set(id, registration));
		if (!this.#targetRegistrations.has(target)) this.#targetRegistrations.set(target, /* @__PURE__ */ new Set());
		this.#targetRegistrations.get(target).add(id);
		this.#ensureListenersForTarget(target);
		const manager = this;
		return {
			get id() {
				return id;
			},
			unregister: () => {
				manager.#unregister(id);
			},
			get callback() {
				return manager.registrations.state.get(id)?.callback ?? callback;
			},
			set callback(newCallback) {
				const reg = manager.registrations.state.get(id);
				if (reg) reg.callback = newCallback;
			},
			setOptions: (newOptions) => {
				manager.registrations.setState((prev) => {
					const reg = prev.get(id);
					if (reg) {
						const next = new Map(prev);
						next.set(id, {
							...reg,
							options: {
								...reg.options,
								...newOptions
							}
						});
						return next;
					}
					return prev;
				});
			},
			get isActive() {
				return manager.registrations.state.has(id);
			}
		};
	}
	/**
	* Unregisters a hotkey by its registration ID.
	*/
	#unregister(id) {
		const registration = this.registrations.state.get(id);
		if (!registration) return;
		const target = registration.target;
		this.registrations.setState((prev) => {
			const next = new Map(prev);
			next.delete(id);
			return next;
		});
		const targetRegs = this.#targetRegistrations.get(target);
		if (targetRegs) {
			targetRegs.delete(id);
			if (targetRegs.size === 0) this.#removeListenersForTarget(target);
		}
	}
	/**
	* Ensures event listeners are attached for a specific target.
	*/
	#ensureListenersForTarget(target) {
		if (typeof document === "undefined") return;
		if (this.#targetListeners.has(target)) return;
		const keydownHandler = this.#createTargetKeyDownHandler(target);
		const keyupHandler = this.#createTargetKeyUpHandler(target);
		target.addEventListener("keydown", keydownHandler);
		target.addEventListener("keyup", keyupHandler);
		this.#targetListeners.set(target, {
			keydown: keydownHandler,
			keyup: keyupHandler
		});
	}
	/**
	* Removes event listeners for a specific target.
	*/
	#removeListenersForTarget(target) {
		if (typeof document === "undefined") return;
		const listeners = this.#targetListeners.get(target);
		if (!listeners) return;
		target.removeEventListener("keydown", listeners.keydown);
		target.removeEventListener("keyup", listeners.keyup);
		this.#targetListeners.delete(target);
		this.#targetRegistrations.delete(target);
	}
	/**
	* Processes keyboard events for a specific target and event type.
	*/
	#processTargetEvent(event, target, eventType) {
		const targetRegs = this.#targetRegistrations.get(target);
		if (!targetRegs) return;
		for (const id of targetRegs) {
			const registration = this.registrations.state.get(id);
			if (!registration) continue;
			if (!isEventForTarget(event, target)) continue;
			if (!registration.options.enabled) continue;
			if (registration.options.ignoreInputs !== false) {
				if (shouldIgnoreInputEvent(event, target, registration.target)) continue;
			}
			if (eventType === "keydown") {
				if (registration.options.eventType !== "keydown") continue;
				if (matchesKeyboardEvent(event, registration.parsedHotkey, registration.options.platform)) {
					if (registration.options.preventDefault) event.preventDefault();
					if (registration.options.stopPropagation) event.stopPropagation();
					if (!registration.options.requireReset || !registration.hasFired) {
						this.#executeHotkeyCallback(registration, event);
						if (registration.options.requireReset) registration.hasFired = true;
					}
				}
			} else {
				if (registration.options.eventType === "keyup") {
					if (matchesKeyboardEvent(event, registration.parsedHotkey, registration.options.platform)) this.#executeHotkeyCallback(registration, event);
				}
				if (registration.options.requireReset && registration.hasFired) {
					if (this.#shouldResetRegistration(registration, event)) registration.hasFired = false;
				}
			}
		}
	}
	/**
	* Executes a hotkey callback with proper event handling.
	*/
	#executeHotkeyCallback(registration, event) {
		if (registration.options.preventDefault) event.preventDefault();
		if (registration.options.stopPropagation) event.stopPropagation();
		registration.triggerCount++;
		this.registrations.setState((prev) => new Map(prev));
		const context = {
			hotkey: registration.hotkey,
			parsedHotkey: registration.parsedHotkey
		};
		registration.callback(event, context);
	}
	/**
	* Creates a keydown handler for a specific target.
	*/
	#createTargetKeyDownHandler(target) {
		return (event) => {
			this.#processTargetEvent(event, target, "keydown");
		};
	}
	/**
	* Creates a keyup handler for a specific target.
	*/
	#createTargetKeyUpHandler(target) {
		return (event) => {
			this.#processTargetEvent(event, target, "keyup");
		};
	}
	/**
	* Finds an existing registration with the same hotkey and target.
	*/
	#findConflictingRegistration(hotkey, target) {
		for (const registration of this.registrations.state.values()) if (registration.hotkey === hotkey && registration.target === target) return registration;
		return null;
	}
	/**
	* Determines if a registration should be reset based on the keyup event.
	*/
	#shouldResetRegistration(registration, event) {
		const parsed = registration.parsedHotkey;
		const releasedKey = normalizeKeyName(event.key);
		const parsedKeyNormalized = parsed.key.length === 1 ? parsed.key.toUpperCase() : parsed.key;
		if ((releasedKey.length === 1 ? releasedKey.toUpperCase() : releasedKey) === parsedKeyNormalized) return true;
		if (parsed.ctrl && releasedKey === "Control") return true;
		if (parsed.shift && releasedKey === "Shift") return true;
		if (parsed.alt && releasedKey === "Alt") return true;
		if (parsed.meta && releasedKey === "Meta") return true;
		return false;
	}
	/**
	* Triggers a registration's callback programmatically from devtools.
	* Creates a synthetic KeyboardEvent and invokes the callback.
	*
	* @param id - The registration ID to trigger
	* @returns True if the registration was found and triggered
	*/
	triggerRegistration(id) {
		const registration = this.registrations.state.get(id);
		if (!registration) return false;
		const parsed = registration.parsedHotkey;
		const syntheticEvent = new KeyboardEvent(registration.options.eventType ?? "keydown", {
			key: parsed.key,
			ctrlKey: parsed.ctrl,
			shiftKey: parsed.shift,
			altKey: parsed.alt,
			metaKey: parsed.meta,
			bubbles: true,
			cancelable: true
		});
		registration.triggerCount++;
		this.registrations.setState((prev) => new Map(prev));
		registration.callback(syntheticEvent, {
			hotkey: registration.hotkey,
			parsedHotkey: registration.parsedHotkey
		});
		return true;
	}
	/**
	* Gets the number of registered hotkeys.
	*/
	getRegistrationCount() {
		return this.registrations.state.size;
	}
	/**
	* Checks if a specific hotkey is registered.
	*
	* @param hotkey - The hotkey string to check
	* @param target - Optional target element to match (if provided, both hotkey and target must match)
	* @returns True if a matching registration exists
	*/
	isRegistered(hotkey, target) {
		for (const registration of this.registrations.state.values()) if (registration.hotkey === hotkey) {
			if (target === void 0 || registration.target === target) return true;
		}
		return false;
	}
	/**
	* Destroys the manager and removes all listeners.
	*/
	destroy() {
		for (const target of this.#targetListeners.keys()) this.#removeListenersForTarget(target);
		this.registrations.setState(() => /* @__PURE__ */ new Map());
		this.#targetListeners.clear();
		this.#targetRegistrations.clear();
	}
};
/**
* Gets the singleton HotkeyManager instance.
* Convenience function for accessing the manager.
*/
function getHotkeyManager() {
	return HotkeyManager.getInstance();
}
//#endregion
export { normalizeRegisterableHotkey as n, detectPlatform as r, getHotkeyManager as t };
