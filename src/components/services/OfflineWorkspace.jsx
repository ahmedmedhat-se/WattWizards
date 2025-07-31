import { useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/workspace.css";

const OfflineWorkspace = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleFileUpload = (e) => {
    e.preventDefault();
    let type = "";
    const selectedValue = document.getElementById('fileCategory').value;
    if (selectedValue === 'Circuit-Breaker-Size') {
      type = 'CircuitBreaker';
    } else if (selectedValue === 'Power-Factor-Correction') {
      type = 'PowerFactorCorrection';
    } else if (selectedValue === 'Electrical-Consumption') {
      type = 'ElectricConsumption';
    } else if (selectedValue === 'Horse-Power-2-Ampere') {
      type = 'HorseToAmpere';
    } else if (selectedValue === 'Ampere-2-Watt') {
      type = 'AmpereToWatt';
    } else if (selectedValue === 'Watt-2-Ampere') {
      type = 'WattToAmpere';
    } else if (selectedValue === 'VoltAmpere-2-Watt') {
      type = 'VoltAmpereToWatt';
    } else {
      return;
    }
    try {
      let xhr = new XMLHttpRequest();
      xhr.onload = function () {
        if (xhr.status === 200) {
          // Create a blob from the response
          const blob = new Blob([xhr.response], {
            type: xhr.getAllResponseHeaders("Content-Type")
          });

          // Create a downloadable link
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          let fileName = document.getElementById("fileType").value == "pdf" ? "pdf" : "xlsx"
          link.download = `result_${document.getElementById("file1").files[0].name.split(".")[0]}.${fileName}`;

          // Trigger the download
          document.body.appendChild(link);
          link.click();

          // Clean up
          document.body.removeChild(link);
          window.URL.revokeObjectURL(link.href);
        }
      };

      xhr.onerror = function () {
        console.log("Error:", xhr.responseText);
      };

      xhr.open('POST', 'http://localhost:8086/CalculateFile', true);
      xhr.withCredentials = true;
      // xhr.setRequestHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')

      xhr.responseType = "blob"
      let y = new FormData(document.forms[0])
      y.append("type", type)
      xhr.send(y);
    } catch (error) {
      console.log('Authentication error:', error);
    }
  };


  return (
    <div className="workspace">
      <div className="container-fluid p-0 m-0 d-flex justify-content-between">
        <h2>WattWizards Offline Workspace</h2>
      </div>

      <form onSubmit={handleFileUpload} className="mb-4">
        <div className="mb-3">
          <label htmlFor="fileCategory" className="form-label text-light">Select Your Operation</label>
          <select
            id="fileCategory"
            className="form-select"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="Circuit-Breaker-Size">Circuit Breaker Size (Program)</option>
            <option value="Power-Factor-Correction">Power-Factor-Correction (Program)</option>
            <option value="Electrical-Consumption">Electrical-Consumption (Program)</option>
            <option value="Horse-Power-2-Ampere">Horse-Power TO Ampere (Program)</option>
            <option value="Ampere-2-Watt">Ampere TO Watt (Program)</option>
            <option value="Watt-2-Ampere">Watt TO Ampere (Program)</option>
          </select>
        </div>

        {/* File Input */}
        <div className="mb-3">
          <input
            type="file"
            name="file"
            id="file1"
            className="form-control"
          />
        </div>

        {/* File Type Selection */}
        <div className="mb-3">
          <label htmlFor="fileType" className="form-label text-light me-2">File</label>
          <select
            id="fileType"
            className="btn btn-primary"
            name='file-type'
          >
            <option value="pdf">.pdf</option>
            <option value="excel">.xlsx</option>
          </select>
        </div>
        
        <button type="submit" className="btn btn-primary">Upload Files</button>

        <Link className='btn btn-primary' to="/wattwizards/workspace/archive">Archive</Link>
      </form>
    </div>
  );
};

export default OfflineWorkspace;