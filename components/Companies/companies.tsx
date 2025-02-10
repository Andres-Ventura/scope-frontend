import { useEffect, useState } from 'react';
import styles from './companies.module.scss';
import { CompanyCard } from '../CompanyCard/company-card';

interface Company {
  id: string;
  name: string;
  logo?: string;
  description: string;
  website?: string;
}

export const CompanyGrid: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
     fetch("https://leaps-scraper.onrender.com/get_all_businesses")
       .then((res) => res.json())
       .then((data) => {
         if (data.data) {
           const formattedCompanies = data.data.map((company: any) => ({
             id: company._id,
             name: company.name,
             logo: company.logo || "",
             description: company.description,
             website: company.website || "",
           }));
           setCompanies(formattedCompanies);
         }
       })
       .catch((err) => setError("Failed to load companies"))
       .finally(() => setLoading(false));
   }, []);

  
  if (loading) {
    return <p>Loading companies...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.grid}>
      {companies.map((company, index) => (
        <CompanyCard key={company.id} business_id={index + 1} {...company} />
      ))}
    </div>
  );
}
