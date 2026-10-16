import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, useFormContext } from 'react-hook-form';
import { Minus, Plus } from '@signozhq/icons';
import { Input } from '@signozhq/ui/input';
import { Button, Input as AntdInput } from 'antd';
import { Typography } from '@signozhq/ui/typography';

import { ChannelSpecFormValues } from '../../CreateAlertChannels/types';
import FormField from '../FormField';

interface MetadataRow {
	key: string;
	value: string;
}

function IncidentIOSettings({ initialMetadata }: IncidentIOProps): JSX.Element {
	const { t } = useTranslation('channels');
	const {
		register,
		control,
		getValues,
		setValue,
		formState: { errors },
	} = useFormContext<ChannelSpecFormValues>();

	/** Writes straight into the form, for controls that are not plain inputs. */
	const setSelectedConfig = (
		patch: (
			current: Partial<ChannelSpecFormValues>,
		) => Partial<ChannelSpecFormValues>,
	): void => {
		Object.entries(patch(getValues())).forEach(([field, value]) => {
			setValue(field as keyof ChannelSpecFormValues, value as never, {
				shouldDirty: true,
			});
		});
	};
	const [metadataRows, setMetadataRows] = useState<MetadataRow[]>(() =>
		Object.entries(initialMetadata || {}).map(([key, value]) => ({
			key,
			value,
		})),
	);

	const update = (patch: Partial<ChannelSpecFormValues>): void =>
		setSelectedConfig((value) => ({ ...value, ...patch }));

	const syncMetadata = (rows: MetadataRow[]): void => {
		setMetadataRows(rows);
		update({
			metadata: Object.fromEntries(
				rows
					.filter((row) => row.key.trim() !== '')
					.map((row) => [row.key, row.value]),
			),
		});
	};

	return (
		<>
			<Typography.Text
				color="muted"
				size="sm"
				testId="incidentio-tip"
				style={{ display: 'block', marginBottom: 16 }}
			>
				{t('incidentio_tip')}{' '}
				<Typography.Link
					href="https://signoz.io/docs/alerts-management/notification-channel/incidentio/"
					target="_blank"
					rel="noopener noreferrer"
				>
					{t('incidentio_tip_link')}
				</Typography.Link>
			</Typography.Text>

			<FormField
				label={t('field_incidentio_url')}
				help={t('help_incidentio_url')}
				error={errors.url?.message}
			>
				<Input {...register('url')} data-testid="incidentio-url-textbox" />
			</FormField>

			<FormField
				label={t('field_incidentio_token')}
				help={t('help_incidentio_token')}
				error={errors.token?.message}
			>
				<Input
					{...register('token')}
					type="password"
					data-testid="incidentio-token-textbox"
				/>
			</FormField>

			<FormField
				label={t('field_incidentio_title')}
				help={t('help_incidentio_title')}
				error={errors.title?.message}
			>
				<Controller
					control={control}
					name="title"
					render={({ field }): JSX.Element => (
						<AntdInput.TextArea
							rows={2}
							data-testid="incidentio-title-textarea"
							value={(field.value as string) ?? ''}
							onChange={field.onChange}
						/>
					)}
				/>
			</FormField>

			<FormField
				label={t('field_incidentio_description')}
				help={t('help_incidentio_description')}
				error={errors.description?.message}
			>
				<Controller
					control={control}
					name="description"
					render={({ field }): JSX.Element => (
						<AntdInput.TextArea
							rows={6}
							data-testid="incidentio-description-textarea"
							value={(field.value as string) ?? ''}
							onChange={field.onChange}
						/>
					)}
				/>
			</FormField>

			<FormField
				label={t('field_incidentio_metadata')}
				help={t('help_incidentio_metadata')}
			>
				{metadataRows.map((row, index) => (
					// rows have no stable identity beyond their position
					// eslint-disable-next-line react/no-array-index-key
					<div key={index} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
						<Input
							placeholder={t('placeholder_incidentio_metadata_key')}
							value={row.key}
							onChange={(event): void =>
								syncMetadata(
									metadataRows.map((r, i) =>
										i === index ? { ...r, key: event.target.value } : r,
									),
								)
							}
							data-testid={`incidentio-metadata-key-${index}`}
						/>
						<Input
							placeholder={t('placeholder_incidentio_metadata_value')}
							value={row.value}
							onChange={(event): void =>
								syncMetadata(
									metadataRows.map((r, i) =>
										i === index ? { ...r, value: event.target.value } : r,
									),
								)
							}
							data-testid={`incidentio-metadata-value-${index}`}
						/>
						<Button
							icon={<Minus size={14} />}
							onClick={(): void =>
								syncMetadata(metadataRows.filter((_, i) => i !== index))
							}
							data-testid={`incidentio-metadata-remove-${index}`}
						/>
					</div>
				))}
				<Button
					type="dashed"
					icon={<Plus size={14} />}
					onClick={(): void =>
						syncMetadata([...metadataRows, { key: '', value: '' }])
					}
					data-testid="incidentio-metadata-add"
				>
					{t('button_incidentio_add_metadata')}
				</Button>
			</FormField>
		</>
	);
}

interface IncidentIOProps {
	initialMetadata?: Record<string, string>;
}

IncidentIOSettings.defaultProps = {
	initialMetadata: undefined,
};

export default IncidentIOSettings;
