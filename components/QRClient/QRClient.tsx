// "use client";
// import React, { useEffect, useRef, useState, ChangeEvent } from "react";
// import QRCodeStyling, { Options, FileExtension } from "qr-code-styling";
// import styles from "./page.module.css";

// export default function QRClient() {
//   const [options, setOptions] = useState<Options>({
//     width: 300,
//     height: 300,
//     type: "svg",
//     data: "http://qr-code-styling.com",
//     image:
//       "https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png",
//     margin: 10,
//     qrOptions: {
//       typeNumber: 0,
//       mode: "Byte",
//       errorCorrectionLevel: "Q",
//     },
//     imageOptions: {
//       hideBackgroundDots: true,
//       imageSize: 0.4,
//       margin: 20,
//       crossOrigin: "anonymous",
//       saveAsBlob: true,
//     },
//     dotsOptions: {
//         type:"classy-rounded",
//       color: "#222222",
//     },
//     cornersSquareOptions: {
//         type: "extra-rounded",
//         color:"#222222"

//     },
//     cornersDotOptions: {
//         type: "dot",
//         color: "#222222",

//     },
//     backgroundOptions: {

//         color: "#5FD4F3",

//     },
//   });
//   const [fileExt, setFileExt] = useState<FileExtension>("svg");
//   const [qrCode, setQrCode] = useState<QRCodeStyling>();
//   const ref = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     setQrCode(new QRCodeStyling(options));
//   }, []);

//   useEffect(() => {
//     if (ref.current) {
//       qrCode?.append(ref.current);
//     }
//   }, [qrCode, ref]);

//   useEffect(() => {
//     if (!qrCode) return;
//     qrCode?.update(options);
//   }, [qrCode, options]);

//   const onDataChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setOptions((options) => ({
//       ...options,
//       data: event.target.value,
//     }));
//   };

//   const onExtensionChange = (event: ChangeEvent<HTMLSelectElement>) => {
//     setFileExt(event.target.value as FileExtension);
//   };

//   const onDownloadClick = () => {
//     if (!qrCode) return;
//     qrCode.download({
//       extension: fileExt,
//     });
//   };
//   return (
//     <>
//       <h2>Client QR code styling for Next.js</h2>
//       <div className={styles.qrWrapper} ref={ref} />
//       <div className={styles.inputWrapper}>
//         <input
//           value={options.data}
//           onChange={onDataChange}
//           className={styles.inputBox}
//         />
//         <input
//           value={options.data}
//           onChange={onDataChange}
//           className={styles.inputBox}
//         />

//         <select onChange={onExtensionChange} value={fileExt}>
//           <option value="svg">SVG</option>
//           <option value="png">PNG</option>
//           <option value="jpeg">JPEG</option>
//           <option value="webp">WEBP</option>
//         </select>
//         <button onClick={onDownloadClick}>Download</button>
//       </div>
//     </>
//   );
// }
"use client";
import React, { useEffect, useRef, useState, ChangeEvent } from "react";
import QRCodeStyling, {
  Options,
  FileExtension,
  CornerSquareType,
  CornerDotType,
} from "qr-code-styling";
import styles from "./page.module.css";

export default function QRClient() {
  const [emailForm, setEmailForm] = useState({
    email: "",
    subject: "",
    message: "",
  });
  const [isEmailValid, setIsEmailValid] = useState(true); // Track email validity

  const [options, setOptions] = useState<Options>({
    width: 300,
    height: 300,
    type: "svg",
    data: "",
    image:
      "https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png",
    margin: 10,
    qrOptions: {
      typeNumber: 0,
      mode: "Byte",
      errorCorrectionLevel: "Q",
    },
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.4,
      margin: 20,
      crossOrigin: "anonymous",
      saveAsBlob: true,
    },
    dotsOptions: {
      type: "classy-rounded",
      color: "#222222",
    },
    cornersSquareOptions: {
      type: "extra-rounded" as CornerSquareType,
      color: "#222222",
    },
    cornersDotOptions: {
      type: "dot" as CornerDotType,
      color: "#222222",
    },
    backgroundOptions: {
      color: "#5FD4F3",
    },
  });

  const [fileExt, setFileExt] = useState<FileExtension>("svg");
  const [qrCode, setQrCode] = useState<QRCodeStyling>();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQrCode(new QRCodeStyling(options));
  }, []);

  useEffect(() => {
    if (ref.current) {
      qrCode?.append(ref.current);
    }
  }, [qrCode, ref]);

  // Update QR code options when emailForm changes
  useEffect(() => {
    if (emailForm.email && emailForm.subject && emailForm.message) {
      const mailtoData = `mailto:${emailForm.email}?subject=${encodeURIComponent(
        emailForm.subject
      )}&body=${encodeURIComponent(emailForm.message)}`;
      setOptions((prevOptions) => ({
        ...prevOptions,
        data: mailtoData,
      }));
    }
  }, [emailForm]);
  

  useEffect(() => {
    if (qrCode) {
      qrCode.update(options);
    }
  }, [options]);

  const handleOptionChange = <K extends keyof Options>(
    key: K,
    value: Options[K]
  ) => {
    setOptions((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handelFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmailForm((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
    if (name === "email") {
      validateEmail(value);
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
  };

  const onExtensionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setFileExt(event.target.value as FileExtension);
  };

  const onDownloadClick = () => {
    if (!qrCode) return;
    qrCode.download({ extension: fileExt });
  };

  return (
    <>
      <h2>Client QR Code Styling for Next.js</h2>
      <div className={styles.qrWrapper} ref={ref} />
      <div className={styles.inputWrapper}>
        <label>Data URL</label>
        <input
          type="email"
          name="email"
          value={emailForm.email}
          onChange={handelFormChange}
          placeholder="Enter Email"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out shadow-sm"
        />
        {!isEmailValid && (
          <p className="text-red-500 text-sm">
            Please enter a valid email address.
          </p>
        )}
        <input
          type="text"
          name="subject"
          value={emailForm.subject}
          onChange={handelFormChange}
          placeholder="Subject Of The Email"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out shadow-sm"
        />
        <input
          type="text"
          name="message"
          value={emailForm.message}
          onChange={handelFormChange}
          placeholder="Message"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out shadow-sm"
        />
        {/* Additional options for QR styling */}
        <label>Dot Color</label>
        <input
          type="color"
          value={options.dotsOptions?.color}
          onChange={(e) =>
            handleOptionChange("dotsOptions", {
              ...options.dotsOptions,
              color: e.target.value,
            })
          }
        />

        <label>Background Color</label>
        <input
          type="color"
          value={options.backgroundOptions?.color}
          onChange={(e) =>
            handleOptionChange("backgroundOptions", { color: e.target.value })
          }
        />

        <label>Corner Square Type</label>
        <select
          value={options.cornersSquareOptions?.type}
          onChange={(e) =>
            handleOptionChange("cornersSquareOptions", {
              ...options.cornersSquareOptions,
              type: e.target.value as CornerSquareType,
            })
          }
        >
          <option value="square">Square</option>
          <option value="dot">Dot</option>
          <option value="extra-rounded">Extra Rounded</option>
        </select>

        <label>Corner Dot Type</label>
        <select
          value={options.cornersDotOptions?.type}
          onChange={(e) =>
            handleOptionChange("cornersDotOptions", {
              ...options.cornersDotOptions,
              type: e.target.value as CornerDotType,
            })
          }
        >
          <option value="square">Square</option>
          <option value="extra-rounded">Extra Rounded</option>
        </select>

        <label>Image Size</label>
        <input
          type="number"
          value={options.imageOptions?.imageSize}
          min="0.1"
          max="1"
          step="0.1"
          onChange={(e) =>
            handleOptionChange("imageOptions", {
              ...options.imageOptions,
              imageSize: parseFloat(e.target.value),
            })
          }
        />

        <label>File Type</label>
        <select onChange={onExtensionChange} value={fileExt}>
          <option value="svg">SVG</option>
          <option value="png">PNG</option>
          <option value="jpeg">JPEG</option>
          <option value="webp">WEBP</option>
        </select>

        <button onClick={onDownloadClick}>Download</button>
      </div>
    </>
  );
}
