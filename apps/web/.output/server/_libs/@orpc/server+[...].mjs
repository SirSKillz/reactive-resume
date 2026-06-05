import { F as runWithSpan, I as setSpanError, N as parseEmptyableJSON, O as isAsyncIteratorObject, V as value, d as flattenHeader, i as toFetchHeaders, y as AsyncIteratorClass } from "./client+[...].mjs";
//#region ../../node_modules/.pnpm/@orpc+standard-server@1.14.3_@opentelemetry+api@1.9.1/node_modules/@orpc/standard-server/dist/batch/index.mjs
function parseBatchRequest(request) {
	const items = request.method === "GET" ? parseEmptyableJSON(request.url.searchParams.getAll("batch").at(-1)) : request.body;
	if (!Array.isArray(items)) throw new TypeError("Invalid batch request");
	return items.map((item) => {
		return {
			method: item.method ?? request.method,
			url: new URL(item.url),
			headers: item.headers ?? {},
			body: item.body,
			signal: request.signal
		};
	});
}
function toBatchResponse(options) {
	const mode = options.mode ?? "streaming";
	const minifyResponseItem = (item) => {
		return {
			index: item.index,
			status: item.status === options.status ? void 0 : item.status,
			headers: Object.keys(item.headers).length ? item.headers : void 0,
			body: item.body
		};
	};
	if (mode === "buffered") return (async () => {
		try {
			const body = [];
			for await (const item of options.body) body.push(minifyResponseItem(item));
			return {
				headers: options.headers,
				status: options.status,
				body
			};
		} finally {
			await options.body.return?.();
		}
	})();
	return {
		headers: options.headers,
		status: options.status,
		body: new AsyncIteratorClass(async () => {
			const { done, value } = await options.body.next();
			if (done) return {
				done,
				value
			};
			return {
				done,
				value: {
					index: value.index,
					status: value.status === options.status ? void 0 : value.status,
					headers: Object.keys(value.headers).length ? value.headers : void 0,
					body: value.body
				}
			};
		}, async (reason) => {
			if (reason !== "next") await options.body.return?.();
		})
	};
}
//#endregion
//#region ../../node_modules/.pnpm/@orpc+server@1.14.3_@opente_b193994479c42d617f8532d7493391ea/node_modules/@orpc/server/dist/plugins/index.mjs
var BatchHandlerPlugin = class {
	maxSize;
	mapRequestItem;
	successStatus;
	headers;
	order = 5e6;
	constructor(options = {}) {
		this.maxSize = options.maxSize ?? 10;
		this.mapRequestItem = options.mapRequestItem ?? ((request, { request: batchRequest }) => ({
			...request,
			headers: {
				...batchRequest.headers,
				...request.headers
			}
		}));
		this.successStatus = options.successStatus ?? 207;
		this.headers = options.headers ?? {};
	}
	init(options) {
		options.rootInterceptors ??= [];
		options.rootInterceptors.unshift(async (options2) => {
			const xHeader = flattenHeader(options2.request.headers["x-orpc-batch"]);
			if (xHeader === void 0) return options2.next();
			let isParsing = false;
			try {
				return await runWithSpan({ name: "handle_batch_request" }, async (span) => {
					const mode = xHeader === "buffered" ? "buffered" : "streaming";
					isParsing = true;
					const parsed = parseBatchRequest({
						...options2.request,
						body: await options2.request.body()
					});
					isParsing = false;
					span?.setAttribute("batch.mode", mode);
					span?.setAttribute("batch.size", parsed.length);
					const maxSize = await value(this.maxSize, options2);
					if (parsed.length > maxSize) {
						const message = "Batch request size exceeds the maximum allowed size";
						setSpanError(span, message);
						return {
							matched: true,
							response: {
								status: 413,
								headers: {},
								body: message
							}
						};
					}
					const responses = parsed.map((request, index) => {
						const mapped = this.mapRequestItem(request, options2);
						return options2.next({
							...options2,
							request: {
								...mapped,
								body: () => Promise.resolve(mapped.body)
							}
						}).then(({ response: response2, matched }) => {
							span?.addEvent(`response.${index}.${matched ? "success" : "not_matched"}`);
							if (matched) {
								if (response2.body instanceof Blob || response2.body instanceof FormData || isAsyncIteratorObject(response2.body)) return {
									index,
									status: 500,
									headers: {},
									body: "Batch responses do not support file/blob, or event-iterator. Please call this procedure separately outside of the batch request."
								};
								return {
									...response2,
									index
								};
							}
							return {
								index,
								status: 404,
								headers: {},
								body: "No procedure matched"
							};
						}).catch((err) => {
							Promise.reject(err);
							return {
								index,
								status: 500,
								headers: {},
								body: "Internal server error"
							};
						});
					});
					await Promise.race(responses);
					const status = await value(this.successStatus, responses, options2);
					const headers = await value(this.headers, responses, options2);
					const promises = [...responses];
					return {
						matched: true,
						response: await toBatchResponse({
							status,
							headers,
							mode,
							body: new AsyncIteratorClass(async () => {
								const handling = promises.filter((p) => p !== void 0);
								if (handling.length <= 0) return {
									done: true,
									value: void 0
								};
								const value2 = await Promise.race(handling);
								promises[value2.index] = void 0;
								return {
									done: false,
									value: value2
								};
							}, async () => {})
						})
					};
				});
			} catch (cause) {
				if (isParsing) return {
					matched: true,
					response: {
						status: 400,
						headers: {},
						body: "Invalid batch request, this could be caused by a malformed request body or a missing header"
					}
				};
				throw cause;
			}
		});
	}
};
var RequestHeadersPlugin = class {
	init(options) {
		options.rootInterceptors ??= [];
		options.rootInterceptors.push((interceptorOptions) => {
			const reqHeaders = interceptorOptions.context.reqHeaders ?? toFetchHeaders(interceptorOptions.request.headers);
			return interceptorOptions.next({
				...interceptorOptions,
				context: {
					...interceptorOptions.context,
					reqHeaders
				}
			});
		});
	}
};
//#endregion
export { RequestHeadersPlugin as n, BatchHandlerPlugin as t };
