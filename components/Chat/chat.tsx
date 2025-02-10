import React, { useEffect, useState } from "react";
import classNames from "classnames";
import styles from "./chat.module.scss";
import io, { Socket } from "socket.io-client";

import { InsightExpanded } from "@/components/Insights/InsightExpanded";
import { Insight } from "@/components/Insights/Insight";
import { InsightDataType } from "@/types/types";
import { LOCAL_IP_ADDRESS } from "@/app/constants";

interface InsightViewProps {
  className?: string;
}

export const ChatTab: React.FC<InsightViewProps> = ({ className }) => {
  const [insights, setInsights] = useState<InsightDataType[]>([]);
  const [activeInsightId, setActiveInsightId] = useState<number | null>(null);
  const [isInsightOpened, setInsightOpened] = useState<InsightDataType | null>(
    null
  );
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connectionStatus, setConnectionStatus] =
    useState<string>("disconnected");

  useEffect(() => {
    console.log(
      "Attempting to connect to WebSocket server at:",
      LOCAL_IP_ADDRESS
    );
    const socketInstance = io(`${LOCAL_IP_ADDRESS}`, {
      transports: ["websocket"],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    setSocket(socketInstance);

    // Connection event handlers
    socketInstance.on("connect", () => {
      console.log("WebSocket connected successfully");
      console.log("Socket ID:", socketInstance.id);
      setConnectionStatus("connected");
      setError(null);
    });

    socketInstance.on("disconnect", (reason) => {
      console.log("WebSocket disconnected. Reason:", reason);
      setConnectionStatus("disconnected");
    });

    socketInstance.on("connect_error", (err: Error) => {
      console.error("WebSocket connection error:", err.message);
      setError(`Connection error: ${err.message}`);
      setConnectionStatus("error");
    });

    socketInstance.on("reconnect_attempt", (attemptNumber) => {
      console.log(`Attempting to reconnect... Attempt ${attemptNumber}`);
      setConnectionStatus("connecting");
    });

    // Insight event handlers
    socketInstance.on("insight_start", () => {
      console.log("Insight generation started");
      const newInsightId = Date.now();
      setActiveInsightId(newInsightId);
      setInsights((prevInsights) => [
        ...prevInsights,
        {
          id: newInsightId,
          text: "",
          isComplete: false,
        },
      ]);
    });

    socketInstance.on("insight_data", (data: { text: string }) => {
      console.log("Received insight data chunk:", data.text);
      if (activeInsightId !== null) {
        setInsights((prevInsights) =>
          prevInsights.map((insight) =>
            insight.id === activeInsightId
              ? { ...insight, text: insight.text + data.text }
              : insight
          )
        );
      }
    });

    socketInstance.on("insight_finished", () => {
      console.log("Insight generation finished");
      if (activeInsightId !== null) {
        setInsights((prevInsights) =>
          prevInsights.map((insight) =>
            insight.id === activeInsightId
              ? { ...insight, isComplete: true }
              : insight
          )
        );
        setActiveInsightId(null);
      }
    });

    return () => {
      console.log("Cleaning up WebSocket connection");
      socketInstance.disconnect();
    };
  }, []);

  const handleInsightClicked = (insight: InsightDataType) => {
    console.log("Insight clicked:", insight);
    setInsightOpened(insight);
  };

  const handleCloseInsight = () => {
    console.log("Closing insight view");
    setInsightOpened(null);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (socket && message.trim()) {
      console.log("Sending message:", message);

      // Emit the message to the server via socket
      socket.emit("send_message", message);

      // Send POST request to the backend
      try {
        console.log(
          "Sending POST request to:",
          `${LOCAL_IP_ADDRESS}/generate_insight`
        );
        const response = await fetch(`${LOCAL_IP_ADDRESS}/generate_insight`, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
          },
          body: message,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.text();
        console.log("Response from server:", responseData);
        setMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
        setError("Failed to send message. Please try again.");
      }
    }
  };

  return (
    <div className={classNames(styles.insightViewContainer, className)}>
      <div className={styles.headerContainer}>
        <h5 className={styles.headerText}>Data</h5>
        <div className={styles.connectionStatus}>
          Status: {connectionStatus}
        </div>
      </div>
      <div className={styles.insightListContainer}>
        {insights.map((insight) => (
          <div
            key={insight.id}
            className={classNames(
              styles.insightItem,
              !insight.isComplete && styles.activeInsight
            )}
            onClick={() => handleInsightClicked(insight)}
          >
            <Insight insight={insight} />
          </div>
        ))}
      </div>
      <div className={styles.inputSection}>
        <span className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="Type your message"
            value={message}
            onChange={handleMessageChange}
            className={styles.inputField}
            disabled={connectionStatus !== "connected"}
          />
          <button
            className={styles.submitButton}
            onClick={handleSendMessage}
            disabled={connectionStatus !== "connected"}
          >
            Go
          </button>
        </span>
      </div>
      {isInsightOpened && (
        <div className={styles.modalOverlay}>
          <InsightExpanded
            onClose={handleCloseInsight}
            insight={isInsightOpened}
          />
        </div>
      )}
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};
