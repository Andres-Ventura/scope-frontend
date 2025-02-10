import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./company-card.module.scss";
import Modal from "react-modal";
import { motion } from "framer-motion";
import { Button, Card, CardContent } from "../Company/company";

interface CompanyCardProps {
  id: string;
  name: string;
  description: string;
  website?: string;
  business_id: number;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({
  name,
  description,
  website,
  business_id,
}) => {
  const [selectedCompany, setSelectedCompany] =
    useState<CompanyCardProps | null>(null);
  const [businessData, setBusinessData] = useState<any>(null);

  useEffect(() => {
    if (selectedCompany) {
      fetch(
        `https://leaps-scraper.onrender.com/get_business_by_id/${business_id}`
      )
        .then((response) => response.json())
        .then((data) => {
          setBusinessData(data.data);
        })
        .catch((error) =>
          console.error("Error fetching business data:", error)
        );
    }
  }, [selectedCompany, business_id]);

  const handleCardClick = () => {
    setSelectedCompany({ name, description, website, business_id, id: "" });
  };

  const getWebsitePreview = (url?: string) => {
    return url
      ? `https://image.thum.io/get/width/600/crop/800/noanimate/${url}`
      : "/placeholder-website-preview.png";
  };

  return (
    <>
      <Card onClick={handleCardClick}>
        <Image
          src={getWebsitePreview(website)}
          alt={name}
          width={400}
          height={250}
          className={styles.websitePreview}
        />
        <CardContent>
          <h3 className={styles.cardTitle}>{name}</h3>
          <p className={styles.cardDescription}>{description}</p>
        </CardContent>
      </Card>

      <Modal
        isOpen={!!selectedCompany}
        onRequestClose={() => setSelectedCompany(null)}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        {selectedCompany && businessData && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.popupContent}
          >
            <Image
              src={getWebsitePreview(selectedCompany.website)}
              alt={selectedCompany.name}
              width={600}
              height={400}
              className={styles.modalImage}
            />
            <h2 className={styles.modalTitle}>{selectedCompany.name}</h2>
            <p className={styles.modalDescription}>
              {selectedCompany.description}
            </p>
            {selectedCompany.website && (
                <a
                  href={selectedCompany.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Website
                </a>
            )}
            <h3 className={styles.listTitle}>Business Details</h3>
            <p>
              <strong>Return Policy:</strong>{" "}
              {businessData.additional_info?.return_policy}
            </p>
            <p>
              <strong>Warranty:</strong>{" "}
              {businessData.additional_info?.warranty}
            </p>
            <h3 className={styles.listTitle}>Benefits</h3>
            <ul>
              {businessData.benefits.map((benefit: string, index: number) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
            <h3 className={styles.listTitle}>Products</h3>
            <ul>
              {businessData.products.map((product: any, index: number) => (
                <li key={index}>
                  <a
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {product.name} - {product.description}
                  </a>
                </li>
              ))}
            </ul>
            <h3 className={styles.listTitle}>Contact Information</h3>
            <p>
              <strong>Phone:</strong> {businessData.contact_information.phone}
            </p>
            <h3 className={styles.listTitle}>Promotions</h3>
            <ul>
              {businessData.promotions.map((promo: any, index: number) => (
                <li key={index}>
                  <strong>{promo.title}:</strong> {promo.details}
                </li>
              ))}
            </ul>
            <h3 className={styles.listTitle}>Social Media</h3>
            <ul>
              {businessData.social_media.map((social: any, index: number) => (
                <li key={index}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.platform}
                  </a>
                </li>
              ))}
            </ul>
            <Button
              variant="destructive"
              onClick={() => setSelectedCompany(null)}
            >
              Close
            </Button>
          </motion.div>
        )}
      </Modal>
    </>
  );
};
