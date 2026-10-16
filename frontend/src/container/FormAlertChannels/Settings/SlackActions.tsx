import { useTranslation } from 'react-i18next';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Minus, Plus } from '@signozhq/icons';
import { Button } from '@signozhq/ui/button';
import { Input } from '@signozhq/ui/input';

import { ChannelSpecFormValues } from '../../CreateAlertChannels/types';
import FormField from '../FormField';
import styles from './SlackActions.module.scss';

// Buttons Slack renders under the attachment. `type` and `text` are required by
// the API; a `button` carrying a url is the link-out case, the rest drive a
// Slack app's own callbacks.
function SlackActions(): JSX.Element {
	const { t } = useTranslation('channels');
	const { control, register } = useFormContext<ChannelSpecFormValues>();
	const { fields, append, remove } = useFieldArray({ control, name: 'actions' });

	return (
		<FormField label={t('field_slack_actions')} help={t('help_slack_actions')}>
			{fields.map((row, index) => (
				<div key={row.id} className={styles.row}>
					<Input
						{...register(`actions.${index}.text`)}
						containerClassName={styles.field}
						placeholder={t('placeholder_slack_action_text')}
						testId={`slack-action-text-${index}`}
					/>
					<Input
						{...register(`actions.${index}.url`)}
						containerClassName={styles.field}
						placeholder={t('placeholder_slack_action_url')}
						testId={`slack-action-url-${index}`}
					/>
					<Input
						{...register(`actions.${index}.type`)}
						containerClassName={styles.field}
						placeholder={t('placeholder_slack_action_type')}
						testId={`slack-action-type-${index}`}
					/>
					<Input
						{...register(`actions.${index}.name`)}
						containerClassName={styles.field}
						placeholder={t('placeholder_slack_action_name')}
						testId={`slack-action-name-${index}`}
					/>
					<Input
						{...register(`actions.${index}.value`)}
						containerClassName={styles.field}
						placeholder={t('placeholder_slack_action_value')}
						testId={`slack-action-value-${index}`}
					/>
					<Input
						{...register(`actions.${index}.style`)}
						containerClassName={styles.field}
						placeholder={t('placeholder_slack_action_style')}
						testId={`slack-action-style-${index}`}
					/>
					<Input
						{...register(`actions.${index}.confirm.text`)}
						containerClassName={styles.field}
						placeholder={t('placeholder_slack_action_confirm')}
						testId={`slack-action-confirm-${index}`}
					/>
					<Button
						variant="ghost"
						color="secondary"
						size="sm"
						icon
						aria-label={t('remove_slack_action')}
						onClick={(): void => remove(index)}
						testId={`slack-action-remove-${index}`}
					>
						<Minus size={14} />
					</Button>
				</div>
			))}
			<Button
				variant="dashed"
				color="secondary"
				size="sm"
				prefix={<Plus size={14} />}
				onClick={(): void => append({ type: 'button', text: '', url: '' })}
				testId="slack-action-add"
			>
				{t('add_slack_action')}
			</Button>
		</FormField>
	);
}

export default SlackActions;
