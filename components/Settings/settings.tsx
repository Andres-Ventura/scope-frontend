// import React from 'react';
// import styles from './settings.module.scss';

// export const SettingsPage: React.FC = () => {
//     const handleAction = async (action: string) => {
//         try {
//             const response = await fetch(`/api/${action}`, { method: 'POST' });
    
//             if (!response.ok) {
//                 throw new Error(`Failed to ${action}`);
//             }
    
//             alert(`${action.replace('-', ' ')} successful!`);
//         } catch (error) {
//             if (error instanceof Error) {
//                 console.error(error);
//                 alert(`Error: ${error.message}`);
//             } else {
//                 alert("An unknown error occurred.");
//             }
//         }
//     };
    
//     return (
//         <div className={styles.settingsContainer}>
//             <h2>Settings</h2>
//             <div className={styles.buttonGroup}>
//                 <button className={styles.addButton} onClick={() => handleAction('add')}>Add</button>
//                 <button className={styles.deleteButton} onClick={() => handleAction('delete')}>Delete</button>
//                 <button className={styles.purgeButton} onClick={() => handleAction('purge-all')}>Purge All</button>
//                 <button className={styles.scraperButton} onClick={() => handleAction('re-run-scraper')}>Re-run Scraper</button>
//             </div>
//         </div>
//     );
// };
