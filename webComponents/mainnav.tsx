import classNames from 'classnames';
import styles from './mainnav.module.scss';
import logo from '@/public/noBackground.png'

import Image from 'next/image';

import { useRouter } from 'next/navigation'

export interface NavHeaderProps {
    className?: string;
}

export const NavHeader = ({ className }: NavHeaderProps) => {
    const router = useRouter(); // Move the useRouter hook inside the component

    
    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles.divMain}>
                <span className={styles.spanMain}>
                    <div className={styles.divLeft}>
                        <Image
                            src={logo}
                            alt=""
                            className={styles.logoClass}
                        />
                        <h2 className={styles.h2class}>Dialogica </h2>
                    </div>
                   
                    <div className={styles.divRight}>
                        <button className={styles.buttonDemo} type="button" onClick={() => router.push('/demo')}>
      Demo
    </button>
                    </div>
                </span>
            </div>
        </div>
    );
};
