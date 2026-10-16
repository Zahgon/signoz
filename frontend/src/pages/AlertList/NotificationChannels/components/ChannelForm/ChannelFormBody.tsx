import { useTranslation } from 'react-i18next';
import FormAlertChannels from 'container/FormAlertChannels';
import { ChannelFormState } from 'container/CreateAlertChannels/channelFormValues';

import { useChannelFormState } from './useChannelFormState';

interface ChannelFormBodyProps {
	draft: ChannelFormState;
	/** Absent when creating. */
	channelId?: string;
	onDone: () => void;
}

/** Mounted only once the draft exists, so the form is built with real values. */
function ChannelFormBody({
	draft,
	channelId,
	onDone,
}: ChannelFormBodyProps): JSX.Element {
	const { t } = useTranslation('channels');
	const { form, type, onTypeChange, onSave, onTest, isSaving, isTesting } =
		useChannelFormState({ draft, channelId, onDone });

	return (
		<FormAlertChannels
			form={form}
			type={type}
			onTypeChangeHandler={onTypeChange}
			onTestHandler={onTest}
			onSaveHandler={onSave}
			savingState={isSaving}
			testingState={isTesting}
			title={channelId ? t('page_title_edit') : t('page_title_create')}
			editing={!!channelId}
		/>
	);
}

export default ChannelFormBody;
