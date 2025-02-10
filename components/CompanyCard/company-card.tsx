import React, { useState } from "react";
import Image from "next/image";
import styles from "./company-card.module.scss";
import Modal from "react-modal";

interface CompanyCardProps {
  id: string;
  name: string;
  description: string;
  website?: string;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({
  name,
  description,
  website,
}) => {
  const [selectedCompany, setSelectedCompany] =
    useState<CompanyCardProps | null>(null);

  const handleCardClick = () => {
    setSelectedCompany({ name, description, website, id: "" });
  };

  const getWebsitePreview = (url?: string) => {
    return url
      ? `https://image.thum.io/get/width/600/crop/800/noanimate/${url}`
      : "/placeholder-website-preview.png";
  };

  return (
    <>
      <div className={styles.card} onClick={handleCardClick}>
        <div className={styles.imageWrapper}>
          <Image
            src={getWebsitePreview(website)}
            alt={name}
            width={300}
            height={200}
            className={styles.websitePreview}
          />
        </div>
        <h3 className={styles.cardTitle}>{name}</h3>
        <p className={styles.cardDescription}>{description}</p>
      </div>

      <Modal
        isOpen={!!selectedCompany}
        onRequestClose={() => setSelectedCompany(null)}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        {selectedCompany && (
          <div className={styles.popupContent}>
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
                className={styles.websiteLink}
              >
                Visit Website
              </a>
            )}
            <button
              className={styles.closeButton}
              onClick={() => setSelectedCompany(null)}
            >
              Close
            </button>
          </div>
        )}
      </Modal>
    </>
  );
};
