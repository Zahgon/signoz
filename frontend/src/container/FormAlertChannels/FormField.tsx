import { ReactNode } from 'react';
import { Typography } from '@signozhq/ui/typography';

import styles from './FormField.module.scss';

interface FormFieldProps {
	label?: ReactNode;
	/** Shown under the control, and replaced by `error` while one is set. */
	help?: ReactNode;
	error?: string;
	htmlFor?: string;
	children: ReactNode;
}

/** Label, control and the one message below it, the layout every channel field uses. */
function FormField({
	label,
	help,
	error,
	htmlFor,
	children,
}: FormFieldProps): JSX.Element {
	return (
		<div className={styles.field}>
			{!!label && (
				<label className={styles.label} htmlFor={htmlFor}>
					<Typography.Text size="sm">{label}</Typography.Text>
				</label>
			)}
			{children}
			{!!(error || help) && (
				<Typography.Text size="sm" color={error ? 'danger' : 'muted'}>
					{error ?? help}
				</Typography.Text>
			)}
		</div>
	);
}

export default FormField;
