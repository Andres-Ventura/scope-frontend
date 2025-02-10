import classNames from 'classnames';
import styles from './Insight.module.scss';

import { InsightDataType } from '@/types/types';

export interface InsightProps {
    className?: string;
    insight: InsightDataType;
}

export const Insight: React.FC<InsightProps> = ({ className, insight }) => {
    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles.divMain}>
                <p className={styles.paragraph}>{insight.text}</p>
            </div>
        </div>
    );
};