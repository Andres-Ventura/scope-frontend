import classNames from 'classnames';
import styles from './InsightExpanded.module.scss';
import { InsightDataType } from '@/types/types';
import React, { useEffect, useState, useRef } from 'react';

export interface InsightExpandedProps {
    className?: string;
    onClose: () => void;
    insight: InsightDataType;
}


export const InsightExpanded = ({ className, onClose, insight }: InsightExpandedProps) => {
    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles.divMain}>
                <button className={styles.button} onClick={onClose}>Close</button>
                <p className={styles.textBox}>{insight.text}</p>
            </div>
        </div>
    );
};