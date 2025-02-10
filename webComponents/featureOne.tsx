import classNames from 'classnames';
import styles from './featureOne.module.scss';
import Image from 'next/image';

export interface ComponentAltLeftProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */

export const Featureone = ({ className }: ComponentAltLeftProps) => {
    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles.divMain}>
                <span className={styles.spanMain}>
                    <div className={styles.divLeft}>
                        <h1 className={styles.h1Class}>User-defined</h1>
                        <p className={styles.paragraph}>
                            User-defined instruction sets Facilitating 
                            the creation of live reference feeds tailored by users through the support of 
                            various file types including Word documents, PDFs, spreadsheets, and many others 
                            for seamless integration and accessibility. 

                        </p>
                        <div className={styles.divLine} />
                        <div className={styles.divFiles}>
                        <button className={styles.button}>Learn More {"->"} </button>
                        </div>
                    </div>
                    <div className={styles.divRight}>
                    <Image
                            src=""
                            alt=""
                            className={styles.imgClass}
                        />
                    </div>
                </span>
            </div>
        </div>
    );
};
