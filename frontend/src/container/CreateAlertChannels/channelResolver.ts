import { TFunction } from 'i18next';
import type { FieldErrors, Resolver } from 'react-hook-form';
import type { $ZodIssue } from 'zod/v4/core';

import { channelNameSchema } from './schemas/shared';
import { ChannelFormValues, ChannelKind } from './types';
import { CHANNEL_SCHEMAS } from './validation';

const toFieldErrors = (
	issues: $ZodIssue[],
	t: TFunction,
): FieldErrors<ChannelFormValues> => {
	const errors: Record<string, { type: string; message: string }> = {};

	issues.forEach((issue) => {
		// an object-level refinement reports no path, and belongs on the field the
		// schema named in `path` or, failing that, on the name
		const field = issue.path.join('.') || 'name';
		if (!errors[field]) {
			errors[field] = { type: 'validation', message: t(issue.message) };
		}
	});

	return errors as FieldErrors<ChannelFormValues>;
};

/**
 * Runs the kind's zod schema as a react-hook-form resolver, so the same schemas
 * that mirror `Validate()` in `pkg/types/alertmanagertypes` drive the form's
 * per-field errors. Messages arrive as i18n keys and are translated here.
 */
export const channelResolver =
	(kind: ChannelKind, t: TFunction): Resolver<ChannelFormValues> =>
	async (values) => {
		const schema = CHANNEL_SCHEMAS[kind];
		const issues: $ZodIssue[] = [
			...(channelNameSchema.safeParse(values).error?.issues ?? []),
			...(schema ? (schema.safeParse(values).error?.issues ?? []) : []),
		];

		if (issues.length === 0) {
			return { values, errors: {} };
		}

		return { values: {}, errors: toFieldErrors(issues, t) };
	};
