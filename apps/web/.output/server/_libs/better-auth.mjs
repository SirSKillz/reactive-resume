import { r as __exportAll } from "../_runtime.mjs";
import { Bn as string, Fn as record, Ot as array } from "./@ai-sdk/react+[...].mjs";
import { ft as APIError, r as createAccessControl } from "./@better-auth/api-key+[...].mjs";
var defaultAc = createAccessControl({
	organization: ["update", "delete"],
	member: [
		"create",
		"update",
		"delete"
	],
	invitation: ["create", "cancel"],
	team: [
		"create",
		"update",
		"delete"
	],
	ac: [
		"create",
		"read",
		"update",
		"delete"
	]
});
var defaultRoles = {
	admin: defaultAc.newRole({
		organization: ["update"],
		invitation: ["create", "cancel"],
		member: [
			"create",
			"update",
			"delete"
		],
		team: [
			"create",
			"update",
			"delete"
		],
		ac: [
			"create",
			"read",
			"update",
			"delete"
		]
	}),
	owner: defaultAc.newRole({
		organization: ["update", "delete"],
		member: [
			"create",
			"update",
			"delete"
		],
		invitation: ["create", "cancel"],
		team: [
			"create",
			"update",
			"delete"
		],
		ac: [
			"create",
			"read",
			"update",
			"delete"
		]
	}),
	member: defaultAc.newRole({
		organization: [],
		member: [],
		invitation: [],
		team: [],
		ac: ["read"]
	})
};
//#endregion
//#region ../../node_modules/.pnpm/better-auth@1.6.11_@opentel_b976606408862afabbcf661098850ea0/node_modules/better-auth/dist/plugins/organization/permission.mjs
var hasPermissionFn = (input, acRoles) => {
	if (!input.permissions) return false;
	const roles = input.role.split(",");
	const creatorRole = input.options.creatorRole || "owner";
	const isCreator = roles.includes(creatorRole);
	const allowCreatorsAllPermissions = input.allowCreatorAllPermissions || false;
	if (isCreator && allowCreatorsAllPermissions) return true;
	for (const role of roles) if ((acRoles[role]?.authorize(input.permissions))?.success) return true;
	return false;
};
var cacheAllRoles = /* @__PURE__ */ new Map();
//#endregion
//#region ../../node_modules/.pnpm/better-auth@1.6.11_@opentel_b976606408862afabbcf661098850ea0/node_modules/better-auth/dist/plugins/organization/has-permission.mjs
var hasPermission = async (input, ctx) => {
	let acRoles = { ...input.options.roles || defaultRoles };
	if (ctx && input.organizationId && input.options.dynamicAccessControl?.enabled && input.options.ac && !input.useMemoryCache) {
		const roles = await ctx.context.adapter.findMany({
			model: "organizationRole",
			where: [{
				field: "organizationId",
				value: input.organizationId
			}]
		});
		for (const { role, permission: permissionsString } of roles) {
			const result = record(string(), array(string())).safeParse(JSON.parse(permissionsString));
			if (!result.success) {
				ctx.context.logger.error("[hasPermission] Invalid permissions for role " + role, { permissions: JSON.parse(permissionsString) });
				throw new APIError("INTERNAL_SERVER_ERROR", { message: "Invalid permissions for role " + role });
			}
			const merged = { ...acRoles[role]?.statements };
			for (const [key, actions] of Object.entries(result.data)) merged[key] = [...new Set([...merged[key] ?? [], ...actions])];
			acRoles[role] = input.options.ac.newRole(merged);
		}
	}
	if (input.useMemoryCache) acRoles = cacheAllRoles.get(input.organizationId) || acRoles;
	cacheAllRoles.set(input.organizationId, acRoles);
	return hasPermissionFn(input, acRoles);
};
//#endregion
//#region ../../node_modules/.pnpm/better-auth@1.6.11_@opentel_b976606408862afabbcf661098850ea0/node_modules/better-auth/dist/plugins/organization/index.mjs
var organization_exports = /* @__PURE__ */ __exportAll({ hasPermission: () => hasPermission });
//#endregion
export { organization_exports as t };
