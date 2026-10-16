import { z } from 'zod';

import { isValidJiraReopenDuration, isValidJiraSiteURL } from '../utils';
import { requiredString } from './shared';

// the API rejects a partial Jira config outright, so all five report one message
const required = requiredString('jira_required_fields');

export const jiraSchema = z.object({
	site: required.refine(isValidJiraSiteURL, { message: 'jira_site_invalid' }),
	email: required,
	apiToken: required,
	project: required,
	issueType: required,
	reopenDuration: z
		.string()
		.optional()
		.refine((v) => !v || isValidJiraReopenDuration(v), {
			message: 'jira_reopen_duration_invalid',
		}),
});
