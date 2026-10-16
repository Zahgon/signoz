import { useTranslation } from 'react-i18next';
import { Controller, useFormContext } from 'react-hook-form';
import { Input } from '@signozhq/ui/input';
import { Input as AntdInput } from 'antd';

import { ChannelSpecFormValues } from '../../CreateAlertChannels/types';
import FormField from '../FormField';
import SlackActions from './SlackActions';
import SlackFields from './SlackFields';

const { TextArea } = AntdInput;

function Slack(): JSX.Element {
	const { t } = useTranslation('channels');
	const {
		register,
		control,
		formState: { errors },
	} = useFormContext<ChannelSpecFormValues>();

	return (
		<>
			<FormField label={t('field_webhook_url')} error={errors.apiUrl?.message}>
				<Input {...register('apiUrl')} data-testid="webhook-url-textbox" />
			</FormField>

			<FormField
				help={t('slack_channel_help')}
				label={t('field_slack_recipient')}
				error={errors.channel?.message}
			>
				<Input {...register('channel')} data-testid="slack-channel-textbox" />
			</FormField>

			<FormField label={t('field_slack_title')} error={errors.title?.message}>
				<Controller
					control={control}
					name="title"
					render={({ field }): JSX.Element => (
						<TextArea
							data-testid="title-textarea"
							rows={4}
							// value={`[{{ .Status | toUpper }}{{ if eq .Status \"firing\" }}:{{ .Alerts.Firing | len }}{{ end }}] {{ .CommonLabels.alertname }} for {{ .CommonLabels.job }}\n{{- if gt (len .CommonLabels) (len .GroupLabels) -}}\n{{\" \"}}(\n{{- with .CommonLabels.Remove .GroupLabels.Names }}\n    {{- range $index, $label := .SortedPairs -}}\n    {{ if $index }}, {{ end }}\n    {{- $label.Name }}=\"{{ $label.Value -}}\"\n    {{- end }}\n{{- end -}}\n)\n{{- end }}`}
							value={(field.value as string) ?? ''}
							onChange={field.onChange}
						/>
					)}
				/>
			</FormField>

			<FormField
				label={t('field_slack_title_link')}
				error={errors.titleLink?.message}
			>
				<Input {...register('titleLink')} data-testid="title-link-textbox" />
			</FormField>

			<FormField label={t('field_slack_description')} error={errors.text?.message}>
				<Controller
					control={control}
					name="text"
					render={({ field }): JSX.Element => (
						<TextArea
							placeholder={t('placeholder_slack_description')}
							data-testid="description-textarea"
							value={(field.value as string) ?? ''}
							onChange={field.onChange}
						/>
					)}
				/>
			</FormField>

			<FormField
				label={t('field_slack_color')}
				help={t('help_slack_color')}
				error={errors.color?.message}
			>
				<Input
					{...register('color')}
					placeholder={t('placeholder_slack_color')}
					data-testid="slack-color-textbox"
				/>
			</FormField>

			<FormField
				label={t('field_slack_pretext')}
				help={t('help_slack_pretext')}
				error={errors.pretext?.message}
			>
				<Input {...register('pretext')} data-testid="slack-pretext-textbox" />
			</FormField>

			<FormField
				label={t('field_slack_fallback')}
				help={t('help_slack_fallback')}
				error={errors.fallback?.message}
			>
				<Input {...register('fallback')} data-testid="slack-fallback-textbox" />
			</FormField>

			<FormField label={t('field_slack_footer')} error={errors.footer?.message}>
				<Input {...register('footer')} data-testid="slack-footer-textbox" />
			</FormField>

			<SlackFields />

			<SlackActions />
		</>
	);
}

export default Slack;
