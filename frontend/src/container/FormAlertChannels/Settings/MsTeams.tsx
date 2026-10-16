import React from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, useFormContext } from 'react-hook-form';
import { Input } from '@signozhq/ui/input';
import { Input as AntdInput } from 'antd';

import { ChannelSpecFormValues } from '../../CreateAlertChannels/types';
import FormField from '../FormField';

function MsTeams(): JSX.Element {
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
							// value={`[{{ .Status | toUpper }}{{ if eq .Status \"firing\" }}:{{ .Alerts.Firing | len }}{{ end }}] {{ .CommonLabels.alertname }} for {{ .CommonLabels.job }}\n{{- if gt (len .CommonLabels) (len .GroupLabels) -}}\n{{\" \"}}(\n{{- with .CommonLabels.Remove .GroupLabels.Names }}\n    {{- range $index, $label := .SortedPairs -}}\n    {{ if $index }}, {{ end }}\n    {{- $label.Name }}=\"{{ $label.Value -}}\"\n    {{- end }}\n{{- end -}}\n)\n{{- end }}`}
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

export default MsTeams;
