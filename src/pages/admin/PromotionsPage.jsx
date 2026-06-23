import React, { useState, useRef } from "react";
import api from "../../api";
import { 
  Star, Send, X, Image, Trash2, Clock, 
  AlertCircle, Upload, FileText, CheckCircle
} from "lucide-react";
import "../../styles/PromotionsStyles.css";

function PromotionsPage() {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.size > 10 * 1024 * 1024) {
      alert("File size should be less than 10MB");
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/quicktime'];
    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Please upload a valid image or video file (JPEG, PNG, GIF, WEBP, MP4)");
      return;
    }

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      const event = { target: { files: [droppedFile] } };
      handleFileChange(event);
    }
  };

  const handleMessageChange = (e) => {
    const text = e.target.value;
    if (text.length <= 500) {
      setMessage(text);
      setCharCount(text.length);
    }
  };

  const removeMedia = () => {
    setFile(null);
    setPreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const sendPromotion = async () => {
    if (!message.trim() && !file) {
      alert("Please add a message or media to send");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("message", message);
      if (file) formData.append("media", file);

      await api.post(
  "/broadcast-media",
  formData,
  {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
);

      setMessage("");
      setCharCount(0);
      setFile(null);
      setPreview("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      
      alert("Promotion sent successfully!");
    } catch (error) {
      console.error("Error sending promotion:", error);
      alert("Failed to send promotion. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="promotions-container">
      <div className="promotions-wrapper">
        {/* Header */}
        <div className="promotions-header">
          <div className="promotions-icon">
            <Star size={28} />
          </div>
          <div>
            <h1 className="promotions-title">Promotion Center</h1>
            <p className="promotions-subtitle">
              Send engaging promotions with messages, images, and videos to all users
            </p>
          </div>
        </div>

        <div className="promotions-card">
          {/* Message Input */}
          <div className="message-section">
            <div className="input-header">
              <label className="input-label">Message</label>
              <span className={`char-counter ${charCount > 450 ? 'char-warning' : ''}`}>
                {charCount}/500
              </span>
            </div>
            <textarea
              className="message-textarea"
              rows="5"
              placeholder="Write your promotion message..."
              value={message}
              onChange={handleMessageChange}
              disabled={loading}
            />
          </div>

          {/* File Upload Area */}
          <div
            className={`upload-area ${dragActive ? 'drag-active' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
              disabled={loading}
            />
            
            {!preview ? (
              <div className="upload-content">
                <Upload size={48} className="upload-icon" />
                <p className="upload-title">Drop your media here or click to browse</p>
                <p className="upload-subtitle">
                  Supports images (JPEG, PNG, GIF, WEBP) and videos (MP4) up to 10MB
                </p>
              </div>
            ) : (
              <div className="preview-container">
                <div className="preview-header">
                  <h3 className="preview-title">Preview</h3>
                  <button onClick={removeMedia} className="remove-media" disabled={loading}>
                    <Trash2 size={16} /> Remove
                  </button>
                </div>
                
                <div className="preview-media">
                  {file?.type.startsWith("image") && (
                    <img src={preview} alt="Preview" className="preview-image" />
                  )}
                  {file?.type.startsWith("video") && (
                    <video controls className="preview-video">
                      <source src={preview} type={file.type} />
                    </video>
                  )}
                </div>
                
                <div className="file-info">
                  <FileText size={14} />
                  <span className="file-name">{file?.name}</span>
                  <span className="file-size">
                    ({(file?.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button
              onClick={() => {
                setMessage("");
                setCharCount(0);
                removeMedia();
              }}
              className="btn-secondary"
              disabled={loading || (!message && !file)}
            >
              <X size={16} /> Clear All
            </button>
            <button
              onClick={sendPromotion}
              disabled={loading || (!message.trim() && !file)}
              className="btn-primary"
            >
              {loading ? (
                <>
                  <div className="spinner-small"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send size={16} /> Send Promotion
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tips Section */}
        <div className="tips-section">
          <div className="tips-header">
            <AlertCircle size={18} />
            <h4>Pro Tips</h4>
          </div>
          <ul className="tips-list">
            <li>
              <CheckCircle size={14} />
              <span>Keep messages concise and engaging for better response rates</span>
            </li>
            <li>
              <Image size={14} />
              <span>Use high-quality images and videos to grab attention</span>
            </li>
            <li>
              <Star size={14} />
              <span>Include clear call-to-action in your promotions</span>
            </li>
            <li>
              <Clock size={14} />
              <span>Best time to send: Weekdays 10 AM - 4 PM</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PromotionsPage;