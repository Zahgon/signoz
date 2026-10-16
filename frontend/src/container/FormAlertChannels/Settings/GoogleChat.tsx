import { useTranslation } from 'react-i18next';
import { Controller, useFormContext } from 'react-hook-form';
import { Input } from '@signozhq/ui/input';
import { Input as AntdInput } from 'antd';

import { ChannelSpecFormValues } from '../../CreateAlertChannels/types';
import FormField from '../FormField';

function GoogleChat(): JSX.Element {
	const { t } = useTranslation('channels');
	const {
		register,
		control,
		formState: { errors },
	} = useFormContext<ChannelSpecFormValues>();

	return (
		<>
			<FormField label={t('field_webhook_url')} error={errors.webhookUrl?.message}>
				<Input {...register('webhookUrl')} data-testid="webhook-url-textbox" />
			</FormField>

			<FormField label={t('field_slack_title')} error={errors.title?.message}>
				<Controller
					control={control}
					name="title"
					render={({ field }): JSX.Element => (
						<AntdInput.TextArea
							rows={4}
							data-testid="title-textarea"
							value={(field.value as string) ?? ''}
							onChange={field.onChange}
						/>
					)}
				/>
			</FormField>

			<FormField label={t('field_slack_description')} error={errors.text?.message}>
				<Controller
					control={control}
					name="text"
					render={({ field }): JSX.Element => (
						<AntdInput.TextArea
							rows={4}
							data-testid="description-textarea"
							placeholder={t('placeholder_slack_description')}
							value={(field.value as string) ?? ''}
							onChange={field.onChange}
						/>
					)}
				/>
			</FormField>
		</>
	);
}

export default GoogleChat;
