import classNames from 'classnames';
import styles from './reputation.module.scss';



export interface GroupUnderMainProps {
    className?: string;
}


export const Reputation = ({ className }: GroupUnderMainProps) => {
    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles.mainDiv}>
            <h1 className={styles.h1One}>Upholding Reputation</h1>
            <h1 className={styles.h1Two}>Backed by Attorneys</h1>
            <div className={styles.mainDivTwo}>
            <h2 className={styles.h2}>Our company collaborates closely with attorneys 
                through a board of advisors to ensure that the 
                product is tailored to meet specific needs and
                 jurisdictions. All data utilized for fact-checking 
                 is sourced exclusively from legal databases, 
                 guaranteeing reliability and accuracy.</h2></div>
            </div>
        </div>
    );
};
