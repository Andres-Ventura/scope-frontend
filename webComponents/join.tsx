import classNames from 'classnames';
import styles from './join.module.scss';



export interface GroupUnderMainProps {
    className?: string;
}


export const Join = ({ className }: GroupUnderMainProps) => {
    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles.mainDiv}>
            
            </div>
        </div>
    );
};
