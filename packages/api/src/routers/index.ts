import { agentRouter } from "./agent";
import { aiRouter } from "./ai";
import { aiProvidersRouter } from "./ai-providers";
import { authRouter } from "./auth";
import { flagsRouter } from "./flags";
import { jobApplicationRouter } from "./job-application";
import { resumeRouter } from "./resume";
import { statisticsRouter } from "./statistics";
import { storageRouter } from "./storage";

export default {
	ai: aiRouter,
	aiProviders: aiProvidersRouter,
	agent: agentRouter,
	auth: authRouter,
	flags: flagsRouter,
	jobApplication: jobApplicationRouter,
	resume: resumeRouter,
	statistics: statisticsRouter,
	storage: storageRouter,
};
