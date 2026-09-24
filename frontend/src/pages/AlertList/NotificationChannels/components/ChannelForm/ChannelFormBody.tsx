import { useTranslation } from 'react-i18next';
import FormAlertChannels from 'container/FormAlertChannels';
import { ChannelFormState } from 'container/CreateAlertChannels/channelFormValues';
import type { BrandedPermission } from 'lib/authz/hooks/useAuthZ/types';

import { useChannelFormState } from './useChannelFormState';

interface ChannelFormBodyProps {
	draft: ChannelFormState;
	/** Absent when creating. */
	channelId?: string;
	onDone: () => void;
	/** The reader has `read` but not `update`, so the fields render disabled. */
	readOnly: boolean;
	/** Gates saving; a denial disables the button and names the missing scope. */
	saveChecks: BrandedPermission[];
	/** Gates a test send, which the API allows with `create`. */
	testChecks: BrandedPermission[];
}

/** Mounted only once the draft exists, so the form is built with real values. */
function ChannelFormBody({
	draft,
	channelId,
	onDone,
	readOnly,
	saveChecks,
	testChecks,
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
			title={
				// eslint-disable-next-line no-nested-ternary
				channelId
					? readOnly
						? t('page_title_view')
						: t('page_title_edit')
					: t('page_title_create')
			}
			editing={!!channelId}
			readOnly={readOnly}
			saveChecks={saveChecks}
			testChecks={testChecks}
		/>
	);
}

export default ChannelFormBody;
