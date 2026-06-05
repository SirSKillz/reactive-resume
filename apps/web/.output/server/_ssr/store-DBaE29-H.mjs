import { vt as zod_default } from "../_libs/@better-auth/api-key+[...].mjs";
import { S as summaryItemSchema, _ as publicationItemSchema, a as coverLetterItemSchema, c as experienceItemSchema, g as projectItemSchema, h as profileItemSchema, l as interestItemSchema, o as customSectionSchema, r as certificationItemSchema, s as educationItemSchema, t as awardItemSchema, u as languageItemSchema, v as referenceItemSchema, w as volunteerItemSchema, x as skillItemSchema } from "./data-B8fRirR8.mjs";
import { i as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-DBaE29-H.js
zod_default.discriminatedUnion("type", [
	zod_default.object({
		type: zod_default.literal("auth.change-password"),
		data: zod_default.undefined()
	}),
	zod_default.object({
		type: zod_default.literal("auth.two-factor.enable"),
		data: zod_default.undefined()
	}),
	zod_default.object({
		type: zod_default.literal("auth.two-factor.disable"),
		data: zod_default.undefined()
	}),
	zod_default.object({
		type: zod_default.literal("api-key.create"),
		data: zod_default.undefined()
	}),
	zod_default.object({
		type: zod_default.literal("resume.create"),
		data: zod_default.undefined()
	}),
	zod_default.object({
		type: zod_default.literal("resume.update"),
		data: zod_default.object({
			id: zod_default.string(),
			name: zod_default.string(),
			slug: zod_default.string(),
			tags: zod_default.array(zod_default.string())
		})
	}),
	zod_default.object({
		type: zod_default.literal("resume.import"),
		data: zod_default.undefined()
	}),
	zod_default.object({
		type: zod_default.literal("resume.duplicate"),
		data: zod_default.object({
			id: zod_default.string(),
			name: zod_default.string(),
			slug: zod_default.string(),
			tags: zod_default.array(zod_default.string()),
			shouldRedirect: zod_default.boolean().optional()
		})
	}),
	zod_default.object({
		type: zod_default.literal("resume.template.gallery"),
		data: zod_default.undefined()
	}),
	zod_default.object({
		type: zod_default.literal("resume.sections.profiles.create"),
		data: zod_default.object({
			item: profileItemSchema.optional(),
			customSectionId: zod_default.string().optional()
		}).optional()
	}),
	zod_default.object({
		type: zod_default.literal("resume.sections.profiles.update"),
		data: zod_default.object({
			item: profileItemSchema,
			customSectionId: zod_default.string().optional()
		})
	}),
	zod_default.object({
		type: zod_default.literal("resume.sections.experience.create"),
		data: zod_default.object({
			item: experienceItemSchema.optional(),
			customSectionId: zod_default.string().optional()
		}).optional()
	}),
	zod_default.object({
		type: zod_default.literal("resume.sections.experience.update"),
		data: zod_default.object({
			item: experienceItemSchema,
			customSectionId: zod_default.string().optional()
		})
	}),
	zod_default.object({
		type: zod_default.literal("resume.sections.education.create"),
		data: zod_default.object({
			item: educationItemSchema.optional(),
			customSectionId: zod_default.string().optional()
		}).optional()
	}),
	zod_default.object({
		type: zod_default.literal("resume.sections.education.update"),
		data: zod_default.object({
			item: educationItemSchema,
			customSectionId: zod_default.string().optional()
		})
	}),
	zod_default.object({
		type: zod_default.literal("resume.sections.projects.create"),
		data: zod_default.object({
			item: projectItemSchema.optional(),
			customSectionId: zod_default.string().optional()
		}).optional()
	}),
	zod_default.object({
		type: zod_default.literal("resume.sections.projects.update"),
		data: zod_default.object({
			item: projectItemSchema,
			customSectionId: zod_default.string().optional()
		})
	}),
	zod_default.object({
		type: zod_default.literal("resume.sections.skills.create"),
		data: zod_default.object({
			item: skillItemSchema.optional(),
			customSectionId: zod_default.string().optional()
		}).optional()
	}),
	zod_default.object({
		type: zod_default.literal("resume.sections.skills.update"),
		data: zod_default.object({
			item: skillItemSchema,
			customSectionId: zod_default.string().optional()
		})
	}),
	zod_default.object({
		type: zod_default.literal("resume.sections.languages.create"),
		data: zod_default.object({
			item: languageItemSchema.optional(),
			customSectionId: zod_default.string().optional()
		}).optional()
	}),
	zod_default.object({
		type: zod_default.literal("resume.sections.languages.update"),
		data: zod_default.object({
			item: languageItemSchema,
			customSectionId: zod_default.string().optional()
		})
	}),
	zod_default.object({
		type: zod_default.literal("resume.sections.awards.create"),
		data: zod_default.object({
			item: awardItemSchema.optional(),
			customSectionId: zod_default.string().optional()
		}).optional()
	}),
	zod_default.object({
		type: zod_default.literal("resume.sections.awards.update"),
		data: zod_default.object({
			item: awardItemSchema,
			customSectionId: zod_default.string().optional()
		})
	}),
	zod_default.object({
		type: zod_default.literal("resume.sections.certifications.create"),
		data: zod_default.object({
			item: certificationItemSchema.optional(),
			customSectionId: zod_default.string().optional()
		}).optional()
	}),
	zod_default.object({
		type: zod_default.literal("resume.sections.certifications.update"),
		data: zod_default.object({
			item: certificationItemSchema,
			customSectionId: zod_default.string().optional()
		})
	}),
	zod_default.object({
		type: zod_default.literal("resume.sections.publications.create"),
		data: zod_default.object({
			item: publicationItemSchema.optional(),
			customSectionId: zod_default.string().optional()
		}).optional()
	}),
	zod_default.object({
		type: zod_default.literal("resume.sections.publications.update"),
		data: zod_default.object({
			item: publicationItemSchema,
			customSectionId: zod_default.string().optional()
		})
	}),
	zod_default.object({
		type: zod_default.literal("resume.sections.interests.create"),
		data: zod_default.object({
			item: interestItemSchema.optional(),
			customSectionId: zod_default.string().optional()
		}).optional()
	}),
	zod_default.object({
		type: zod_default.literal("resume.sections.interests.update"),
		data: zod_default.object({
			item: interestItemSchema,
			customSectionId: zod_default.string().optional()
		})
	}),
	zod_default.object({
		type: zod_default.literal("resume.sections.volunteer.create"),
		data: zod_default.object({
			item: volunteerItemSchema.optional(),
			customSectionId: zod_default.string().optional()
		}).optional()
	}),
	zod_default.object({
		type: zod_default.literal("resume.sections.volunteer.update"),
		data: zod_default.object({
			item: volunteerItemSchema,
			customSectionId: zod_default.string().optional()
		})
	}),
	zod_default.object({
		type: zod_default.literal("resume.sections.references.create"),
		data: zod_default.object({
			item: referenceItemSchema.optional(),
			customSectionId: zod_default.string().optional()
		}).optional()
	}),
	zod_default.object({
		type: zod_default.literal("resume.sections.references.update"),
		data: zod_default.object({
			item: referenceItemSchema,
			customSectionId: zod_default.string().optional()
		})
	}),
	zod_default.object({
		type: zod_default.literal("resume.sections.summary.create"),
		data: zod_default.object({
			item: summaryItemSchema.optional(),
			customSectionId: zod_default.string().optional()
		}).optional()
	}),
	zod_default.object({
		type: zod_default.literal("resume.sections.summary.update"),
		data: zod_default.object({
			item: summaryItemSchema,
			customSectionId: zod_default.string().optional()
		})
	}),
	zod_default.object({
		type: zod_default.literal("resume.sections.cover-letter.create"),
		data: zod_default.object({
			item: coverLetterItemSchema.optional(),
			customSectionId: zod_default.string().optional()
		}).optional()
	}),
	zod_default.object({
		type: zod_default.literal("resume.sections.cover-letter.update"),
		data: zod_default.object({
			item: coverLetterItemSchema,
			customSectionId: zod_default.string().optional()
		})
	}),
	zod_default.object({
		type: zod_default.literal("resume.sections.custom.create"),
		data: customSectionSchema.optional()
	}),
	zod_default.object({
		type: zod_default.literal("resume.sections.custom.update"),
		data: customSectionSchema
	})
]);
var useDialogStore = create((set) => ({
	open: false,
	activeDialog: null,
	onBeforeClose: null,
	onOpenChange: (open, eventDetails) => {
		if (open) return set({ open: true });
		const { onBeforeClose } = useDialogStore.getState();
		if (!onBeforeClose) return useDialogStore.getState().closeDialog();
		Promise.resolve(onBeforeClose()).then((canClose) => {
			if (canClose) return useDialogStore.getState().closeDialog();
			eventDetails?.cancel?.();
		});
	},
	openDialog: (type, data) => set({
		open: true,
		activeDialog: {
			type,
			data
		},
		onBeforeClose: null
	}),
	closeDialog: () => {
		set({ open: false });
		setTimeout(() => {
			set({
				activeDialog: null,
				onBeforeClose: null
			});
		}, 300);
	},
	setOnBeforeClose: (handler) => set({ onBeforeClose: handler })
}));
//#endregion
export { useDialogStore as t };
