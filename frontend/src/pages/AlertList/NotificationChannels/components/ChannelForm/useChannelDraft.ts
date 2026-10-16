import { useEffect, useState } from 'react';
import { useGetNotificationChannel } from 'api/generated/services/channels';
import { RenderErrorResponseDTO } from 'api/generated/services/sigNoz.schemas';
import { ErrorType } from 'api/generatedAPIInstance';
import {
	ChannelFormState,
	toChannelFormState,
} from 'container/CreateAlertChannels/channelFormValues';
import { ChannelInitialConfig } from 'container/CreateAlertChannels/defaults';
import { ChannelKind } from 'container/CreateAlertChannels/types';
import { toAPIError } from 'utils/errorUtils';

export interface ChannelDraftResult {
	/** Null until an edited channel has loaded. */
	draft: ChannelFormState | null;
	isLoading: boolean;
	/** A channel the v2 API cannot model, or one that no longer exists. */
	loadError: string | null;
}

/**
 * The channel being edited, or a blank one. Kept apart from the form so the form
 * is built once its values are known, rather than mounted empty and reset.
 */
export function useChannelDraft(channelId?: string): ChannelDraftResult {
	const isEditing = !!channelId;

	const { data, error: loadFailure } = useGetNotificationChannel(
		{ id: channelId ?? '' },
		{ query: { enabled: isEditing } },
	);

	const [draft, setDraft] = useState<ChannelFormState | null>(() =>
		channelId
			? null
			: {
					kind: ChannelKind.slack,
					values: {
						sendResolved: true,
						...ChannelInitialConfig[ChannelKind.slack],
					},
				},
	);

	useEffect(() => {
		if (data?.data) {
			setDraft((current) => current ?? toChannelFormState(data.data));
		}
	}, [data]);

	return {
		draft,
		// A failed fetch never produces a draft, so the spinner has to yield to the
		// error rather than wait for one.
		isLoading: isEditing && !draft && !loadFailure,
		loadError: loadFailure
			? toAPIError(
					loadFailure as ErrorType<RenderErrorResponseDTO>,
				).getErrorMessage()
			: null,
	};
}
