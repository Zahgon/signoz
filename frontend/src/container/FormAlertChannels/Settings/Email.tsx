import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import { Input } from '@signozhq/ui/input';
import { ChannelSpecFormValues } from '../../CreateAlertChannels/types';
import FormField from '../FormField';

function EmailForm(): JSX.Element {
	const { t } = useTranslation('channels');
	const {
		register,
		formState: { errors },
	} = useFormContext<ChannelSpecFormValues>();

	return (
		<>
			<FormField
				help={t('help_email_to')}
				label={t('field_email_to')}
				error={errors.to?.message}
			>
				<Input
					{...register('to')}
					placeholder={t('placeholder_email_to')}
					data-testid="email-to-textbox"
				/>
			</FormField>

			{/* <FormField label={t('field_email_html')} required
				error={errors.html?.message}
			>
				<Controller
					control={control}
					name="html"
					render={({ field }): JSX.Element => (
						<TextArea
					rows={4}
					placeholder={t('placeholder_email_html')}
							value={(field.value as string) ?? ''}
							onChange={field.onChange}
						/>
					)}
				/>
			</FormField> */}
		</>
	);
}

export default EmailForm;
