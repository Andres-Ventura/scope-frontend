import classNames from 'classnames';
import styles from './footer.module.scss';
import Image from 'next/image';

export interface ComponentAltRightProps {
    className?: string;
}

export const Footer = ({ className }: ComponentAltRightProps) => {
    return (
        <div className={classNames(styles.root, className)}>
        
                <div className={styles.line} />

        <span className={styles.spanMain}>
            <div className={styles.leftDiv}>
            <Image height={24} width={24} src="" alt="" />
            </div>
            <div className={styles.rightDiv}>
            <h2>text goes here</h2>
            </div>
        </span>

        <span className={styles.spanMainTwo}>
            <div className={styles.leftDivTwo}>
            <Image height={24} width={24} src="" alt="" />
            </div>
            <div className={styles.rightDivTwo}>
            <h2>text goes here</h2>
            </div>
        </span>



        </div>
    );
};
