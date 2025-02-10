import React, { useState } from "react";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-modal";
import styles from "./mybusiness.module.scss";

export const MyBusiness: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [business, setBusiness] = useState<Business | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  interface Business {
    name: string;
    address: string;
    phone: string;
    website: string;
    logo: string;
    description: string;
  }

  const handleFindBusiness = () => {
    setLoading(true);
    setTimeout(() => {
      setBusiness({
        name: "Tech Solutions Inc.",
        address: "1234 Innovation Drive, Los Angeles, CA",
        phone: "(123) 456-7890",
        website: "www.techsolutions.com",
        logo: "/company-logo.png",
        description: "Innovative solutions for modern businesses.",
      });
      setLoading(false);
      setModalOpen(true);
    }, 5000);
  };

  return (
    <div className="container text-center mt-4">
      {loading ? (
        <div className="d-flex flex-column align-items-center">
          <div className="spinner-border text-light" role="status"></div>
          <p className="mt-2">Finding your business...</p>
        </div>
      ) : (
        <button className="btn btn-primary btn-lg" onClick={handleFindBusiness}>
          Find My Business
        </button>
      )}

      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        {business && (
          <div className={styles.popupContent}>
            <Image
              src={business.logo}
              alt={business.name}
              width={100}
              height={100}
            />
            <h2 className="mt-3">{business.name}</h2>
            <p>
              <strong>Address:</strong> {business.address}
            </p>
            <p>
              <strong>Phone:</strong> {business.phone}
            </p>
            <p>
              <strong>Website:</strong>{" "}
              <a
                href={`https://${business.website}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {business.website}
              </a>
            </p>
            <p>{business.description}</p>
            <button
              className="btn btn-secondary mt-3"
              onClick={() => setModalOpen(false)}
            >
              Close
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};
