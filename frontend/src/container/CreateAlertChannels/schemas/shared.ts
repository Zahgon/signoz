import { z } from 'zod';

/**
 * Messages are i18n keys, not sentences: the form translates whatever a schema
 * reports, so the schemas stay free of the `channels` namespace.
 */
export const requiredString = (messageKey: string): z.ZodString =>
	// an untouched field arrives as undefined, which would otherwise report zod's
	// own "expected string" instead of the message the form should show
	z.string({ error: messageKey }).trim().min(1, messageKey);

/** The display name the API carries outside the config, required for every kind. */
export const channelNameSchema = z.object({
	name: requiredString('channel_name_required'),
});
