import { useTranslation } from 'react-i18next';
import { Callout } from '@signozhq/ui/callout';
import Spinner from 'components/Spinner';
import { useNotificationChannelPermissions } from 'hooks/notificationChannels/useNotificationChannelPermissions';

import ChannelFormBody from './ChannelFormBody';
import styles from './ChannelForm.module.scss';
import { useChannelDraft } from './useChannelDraft';

interface ChannelFormProps {
	/** Absent when creating. */
	channelId?: string;
	onDone: () => void;
}

function ChannelForm({ channelId, onDone }: ChannelFormProps): JSX.Element {
	const { t } = useTranslation('channels');
	const { draft, isLoading, loadError } = useChannelDraft(channelId);

	// A reader with `read` but no `update` still gets the screen, without saving.
	// While the check is in flight the answer is unknown, so the form stays
	// editable rather than flashing read-only; the API is the real gate.
	const { canEdit, isLoading: isPermissionLoading } =
		useNotificationChannelPermissions(channelId ?? '', {
			enabled: !!channelId,
		});
	const readOnly = !!channelId && !isPermissionLoading && !canEdit;

	// A channel written through the v1 API can carry a configuration this API
	// does not model, several notifier configs on one channel for instance.
	if (loadError) {
		return (
			<Callout
				type="error"
				showIcon
				title={loadError}
				className={styles.loadError}
				testId="channel-load-error"
			>
				This channel carries a configuration this form cannot represent, because it
				was written through the v1 API. Recreate it here, or keep editing it through
				that API.
			</Callout>
		);
	}

	if (isLoading || !draft) {
		return <Spinner tip={t('loading_channels_message')} />;
	}

	return (
		<ChannelFormBody
			draft={draft}
			channelId={channelId}
			onDone={onDone}
			readOnly={readOnly}
		/>
	);
}

export default ChannelForm;
