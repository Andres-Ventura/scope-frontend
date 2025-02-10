import classNames from 'classnames';
import styles from './featureTwo.module.scss';
import Image from 'next/image';

export interface ComponentAltRightProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const Featuretwo = ({ className }: ComponentAltRightProps) => {
    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles.divMain}>
                <span className={styles.spanMain}>
                    <div className={styles.divLeft}>
                        <Image
                            src=""
                            alt=""
                            className={styles.imageClass}
                        />
                    </div>
                    <div className={styles.divRight}>
                        <h1 className={styles.h1Class}>Active listening</h1>
                        <p className={styles.paragraphClass}>Dialogica operates in sync with your efforts, actively engaging in conversations and offering valuable insights. Specifically designed for legal depositions, interrogations, and trials, Dialogica collaborates with you to enhance your understanding in real-time. By accessing user-uploaded documents, Legal Databases, and various generative External services, Dialogica empowers attorneys with comprehensive support.</p>
                        <div className={styles.divLine} />
                        <div>
                        <button className={styles.button}>Learn More {"->"} </button>
                        </div>
                    </div>
                </span>
            </div>
        </div>
    );
};
