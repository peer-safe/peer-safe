import { useEffect, useRef, useState } from "react";
const encryptionStyles = [
  "encryption",
  "encryptiow",
  "encryptiol",
  "encryptifc",
  "encryptikh",
  "encryptkpn",
  "encryptskv",
  "encrypmmkw",
  "encrypjmft",
  "encryjvlko",
  "encryhfkie",
  "encrmocggi",
  "encrpdktlv",
  "encgjisize",
  "encuyqcqyh",
  "enxduutqxc",
  "enujtlvceq",
  "eoygbrijbf",
  "ejojqdmeza",
  "vbhetloaqj",
];
const decryptionStyles = [
  "decryption",
  "decryptiod",
  "decryptioc",
  "decryptikm",
  "decryptiff",
  "decryptuor",
  "decryptkut",
  "decryprzet",
  "decrypahdn",
  "decrybmyxv",
  "decryfeixj",
  "decrhjyksy",
  "decrkcigzb",
  "decaawfetp",
  "decoklrezd",
  "deobrcpfon",
  "debhqoqfjf",
  "dfbqrmqoej",
  "ddjhcncole",
  "gfkshnapmw",
];

const Illustration = () => {
  const [encryption, setEncryption] = useState("encryption");
  const [decryption, setDecryption] = useState("decryption");
  const encryptionTimeout = useRef<NodeJS.Timer | null>(null);
  const decryptionTimeout = useRef<NodeJS.Timer | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (!svgRef.current) return;

    const changeEncryption = () => {
      if (encryptionTimeout.current) clearTimeout(encryptionTimeout.current);
      let _styles = Array.from(encryptionStyles);
      const svgTime = ((svgRef.current?.getCurrentTime() || 8.2)*1000) % 40000;
      const _changeIt = () => {
        const newStr = _styles.pop();
        if (!newStr) return;
        setEncryption(newStr);
        setTimeout(_changeIt, 80);
      };
      if (svgTime <= 8300 && svgTime >= 8100) {
        setTimeout(_changeIt, 80);
        encryptionTimeout.current = setTimeout(
          changeEncryption,
          48200 - svgTime
        );
      } else {
        console.log("svgAnimEncryption out of sync:", svgTime);
        if (svgTime < 8100) {
          encryptionTimeout.current = setTimeout(
            changeEncryption,
            8200 - svgTime
          );
        } else {
          encryptionTimeout.current = setTimeout(
            changeEncryption,
            48200 - svgTime
          );
        }
      }
    };
    const changeDecryption = () => {
      if (decryptionTimeout.current) clearTimeout(decryptionTimeout.current);
      let _styles = Array.from(decryptionStyles);
      const svgTime = ((svgRef.current?.getCurrentTime() || 28.2)*1000) % 40000;
      const _changeIt = () => {
        const newStr = _styles.pop();
        if (!newStr) return;
        setDecryption(newStr);
        setTimeout(_changeIt, 80);
      };
      if (svgTime <= 28300 && svgTime >= 28100) {
        setTimeout(_changeIt, 80);
        decryptionTimeout.current = setTimeout(
          changeDecryption,
          68200 - svgTime
        );
      } else {
        console.log("svgAnimDecryption out of sync:", svgTime);
        if (svgTime < 28100) {
          decryptionTimeout.current = setTimeout(
            changeDecryption,
            28200 - svgTime
          );
        } else {
          decryptionTimeout.current = setTimeout(
            changeDecryption,
            68200 - svgTime
          );
        }
      }
    };

    encryptionTimeout.current = setTimeout(() => {
      changeEncryption();
    }, 8200 - (svgRef.current.getCurrentTime() % 40) * 1000);
    decryptionTimeout.current = setTimeout(() => {
      changeDecryption();
    }, 28200 - (svgRef.current.getCurrentTime() % 40) * 1000);

    return () => {
      if (encryptionTimeout.current) {
        clearTimeout(encryptionTimeout.current);
      }
      if (decryptionTimeout.current) {
        clearTimeout(decryptionTimeout.current);
      }
    };
  }, [svgRef]);
  return (
    <div className="absolute bottom-4 left-0 right-0 top-4 flex items-center justify-center max-sm:-top-8 max-sm:bottom-8 sm:justify-end">
      <svg
        viewBox="-5 -5 866 1100"
        id="SVGRoot"
        color="#101010"
        fontFamily="JetBrains Mono"
        fontSize="18px"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        xmlns="http://www.w3.org/2000/svg"
        ref={svgRef}
        className="fade-in-2 -z-10 aspect-[866/1100] h-full max-w-[calc(100vw-4rem)] max-lg:max-h-[36rem] max-md:max-h-[32rem]"
      >
        <defs>
          <linearGradient id="Emerald">
            <stop
              offset={0}
              style={{
                stopColor: "#189d9d",
              }}
            />
            <stop
              offset={0.435}
              style={{
                stopColor: "#189d9d",
                stopOpacity: 0.4078,
              }}
            />
            <stop
              offset={1}
              style={{
                stopColor: "#189d9d",
                stopOpacity: 0,
              }}
            />
          </linearGradient>
          <linearGradient id="Aqua">
            <stop
              offset={0}
              style={{
                stopColor: "#185a9d",
              }}
            />
            <stop
              offset={1}
              style={{
                stopColor: "#185a9d",
                stopOpacity: 0,
              }}
            />
          </linearGradient>
          <linearGradient
            xlinkHref="#Aqua"
            id="linearGradientTopLeft"
            x1={260.7}
            x2={309}
            y1={340.3}
            y2={245.7}
            gradientTransform="matrix(1.001 0 0 1 -.02 .002)"
            gradientUnits="userSpaceOnUse"
          />
          <linearGradient
            xlinkHref="#Aqua"
            id="linearGradientTopLeft2"
            x1={518.5}
            x2={472.7}
            y1={343.9}
            y2={249.4}
            gradientTransform="matrix(1.001 0 0 1 -.02 .002)"
            gradientUnits="userSpaceOnUse"
          />
          <linearGradient
            xlinkHref="#Emerald"
            id="linearGradientRight"
            x1={783.2}
            x2={653.5}
            y1={930.3}
            y2={658}
            gradientTransform="matrix(1.001 0 0 1 -.02 .002)"
            gradientUnits="userSpaceOnUse"
          />
          <linearGradient
            xlinkHref="#Emerald"
            id="linearGradientBottomLeft2"
            x1={542.7}
            x2={453}
            y1={948.4}
            y2={745.4}
            gradientTransform="matrix(1.001 0 0 1 -.02 .002)"
            gradientUnits="userSpaceOnUse"
          />
          <linearGradient
            xlinkHref="#Aqua"
            id="linearGradientBottomRight"
            x1={542.3}
            x2={592.6}
            y1={1031}
            y2={942}
            gradientTransform="matrix(1.001 0 0 1 -.02 .002)"
            gradientUnits="userSpaceOnUse"
          />
          <linearGradient
            xlinkHref="#Aqua"
            id="linearGradientBottomRight2"
            x1={770}
            x2={719.9}
            y1={1030}
            y2={942.1}
            gradientTransform="matrix(1.001 0 0 1 -.02 .002)"
            gradientUnits="userSpaceOnUse"
          />
          <linearGradient
            xlinkHref="#Emerald"
            id="linearGradientBottomLeft"
            x1={263.5}
            x2={348.3}
            y1={943.6}
            y2={755}
            gradientUnits="userSpaceOnUse"
          />
        </defs>
        <g transform="translate(-30.7 -61.62)">
          <path
            id="bottomRightBase"
            d="m459.9 952.4 32.75-18.9v15.12l163.8 94.49 163.8-94.49V933.5L853 952.4l-196.5 113.4z"
            style={{
              fill: "none",
              fontVariationSettings: "normal",
              stopColor: "#000",
              strokeWidth: 2.001,
              stroke: "#2d2d2d",
            }}
          />
          <path
            id="bottomRightGrad"
            d="M492.6 873.1v75.59l163.8 94.49v-75.59z"
            style={{
              fill: "url(#linearGradientBottomRight)",
              strokeWidth: 2.001,
              stroke: "#2d2d2d",
            }}
          />
          <path
            d="M557.8 192.8v75.59l-163.7 94.49v-75.59z"
            style={{
              fill: "currentColor",
            }}
          />
          <path
            id="bottomRight2Grad"
            d="M820.2 873.1v75.59l-163.8 94.49v-75.59z"
            style={{
              fill: "url(#linearGradientBottomRight2)",
              strokeWidth: 2.001,
              stroke: "#2d2d2d",
            }}
          />
          <path
            id="bottomRightBaseWall"
            d="M459.9 952.4v15.12l196.5 113.4v-15.12z"
            style={{
              fill: "none",
              strokeWidth: 2.001,
              stroke: "#2d2d2d",
            }}
          />
          <path
            d="M852.9 952.4v15.12l-196.5 113.4v-15.12z"
            style={{
              fill: "none",
              strokeWidth: 2.001,
              stroke: "#2d2d2d",
            }}
          />
          <path
            id="topLeftBase"
            d="m230.6 192.8 163.8-94.49 163.8 94.49-163.8 94.49z"
            style={{
              fill: "none",
              strokeWidth: 2,
              stroke: "#2d2d2d",
            }}
          />
          <path
            id="left"
            d="m230.6 268.3 163.8 94.49v264.6L230.6 532.9z"
            style={{
              fill: "currentColor",
              strokeWidth: 2,
              stroke: "#2d2d2d",
            }}
          />
          <path
            d="m394.4 627.4 98.26-56.69v-60.47l65.51-37.8v-204.1l-163.8 94.49z"
            style={{
              fill: "none",
              strokeWidth: 2,
              stroke: "#2d2d2d",
            }}
          />
          <path
            id="topLeft"
            d="M230.6 192.8v75.59l163.8 94.49v-75.59z"
            style={{
              fill: "currentColor",
              strokeWidth: 1,
              stroke: "#2d2d2d",
            }}
          />
          <path
            id="topLeft2Grad"
            d="m558.2 192.8-163.8 94.49v75.59l163.8-94.49z"
            style={{
              fill: "url(#linearGradientTopLeft2)",
              strokeWidth: 1,
              stroke: "#2d2d2d",
            }}
          />
          <path
            id="bottomLeftGrad"
            d="M230.6 532.9v302.4l163.8 94.49v-302.4z"
            style={{
              fill: "url(#linearGradientBottomLeft)",
              strokeWidth: 2.001,
              stroke: "#2d2d2d",
            }}
          />
          <path
            id="bottomLeft2Grad"
            d="m558.2 835.3-163.8 94.49v-302.4l163.8-94.49z"
            style={{
              fill: "url(#linearGradientBottomLeft2)",
              strokeWidth: 2.001,
              stroke: "#2d2d2d",
            }}
          />
          <path
            id="topLeftGrad"
            d="M230.6 192.8v75.59l163.8 94.49v-75.59z"
            style={{
              fill: "url(#linearGradientTopLeft)",
              strokeWidth: 1,
              stroke: "#2d2d2d",
            }}
          />
          <path
            id="bottomRightCeiling"
            d="M767.8 842.8H545.1l-52.41 30.24 163.8 94.49 163.8-94.49-52.41-30.24"
            style={{
              fill: "none",
              fontVariationSettings: "normal",
              stopColor: "#000",
              strokeWidth: 2.001,
              stroke: "#2d2d2d",
            }}
          />
          <path
            id="bottomLeftLine"
            d="m230.5 835.3 163.9 94.49 150.7-86.93"
            style={{
              fill: "none",
              strokeWidth: 2,
              stroke: "#6ee7b7",
            }}
          />
          <path
            id="rightCeiling"
            d="m492.6 510.2 163.8-94.49 163.8 94.49-163.8 94.49z"
            style={{
              fill: "currentColor",
              strokeWidth: 2.001,
              stroke: "#2d2d2d",
            }}
          />
          <path
            d="M820.2 510.2v302.4l-163.8 94.49v-302.4z"
            style={{
              fill: "currentColor",
              strokeWidth: 2.001,
              stroke: "#2d2d2d",
            }}
          />
          <path
            id="right2Grad"
            d="M656.4 604.7v302.4l163.8-94.49v-302.4l-13.1 7.559v287.2l-137.6 79.37v-287.2z"
            style={{
              fill: "url(#linearGradientRight)",
              fontVariationSettings: "normal",
              stopColor: "#000",
            }}
          />
          <path
            id="right"
            d="M492.7 510.2v302.4l163.7 94.49v-302.4z"
            style={{
              fill: "currentColor",
              strokeWidth: 2,
              stroke: "#2d2d2d",
            }}
          />
          <path
            id="rightLine"
            d="m492.7 812.6 163.7 94.49 163.8-94.49"
            style={{
              fill: "none",
              strokeWidth: 2,
              stroke: "#6ee7b7",
            }}
          />
          <path
            id="conEncryptionData"
            d="m701.8 404.4-6.21-3.57a4.607 4.607 89.95 0 1-.006-7.985l130.3-75.15a4.616 4.616 90 0 0 0-7.996l-425-245.2a13.87 13.87 180 0 0-13.86 0l-58.58 33.8"
            style={{
              fill: "none",
              strokeWidth: 2.001,
              stroke: "#2d2d2d",
            }}
          />
          <path
            id="conStorageEncryption"
            d="m832.7 487.6 13.22 7.424a13.67 13.67 59.66 0 1 6.976 11.92v399.7a13.85 13.85 59.99 0 0 6.929 12l18.9 10.9a13.85 13.85 59.99 0 1 6.929 12v44.47a13.85 13.85 120 0 1-6.929 12l-261.3 150.7a13.87 13.87 180 0 1-13.86 0l-386.1-222.8"
            style={{
              fill: "none",
              strokeWidth: 2.001,
              stroke: "#2d2d2d",
            }}
          />
          <path
            id="conDecryptionStorage"
            d="m197.4 393.1.49 415.3a13.83 13.83 120 0 1-6.92 12l-71.3 41.14a4.616 4.616 90 0 0 0 7.996l58.58 33.8"
            style={{
              fill: "none",
              strokeWidth: 2.001,
              stroke: "#2d2d2d",
            }}
          />
          <path
            id="conDataDecryption"
            d="m125.7 328.8-91.76-52.71a4.605 4.605 89.94 0 1-.008-7.983l209.2-120.7"
            style={{
              fill: "none",
              strokeWidth: 2.001,
              stroke: "#2d2d2d",
            }}
          />
          <circle r="5" fill="#2d2d2dff" id="data-encryption">
            <animateMotion
              dur="40s"
              calcMode="linear"
              repeatCount="indefinite"
              keyPoints="0;1;1"
              keyTimes="0;0.2;1"
              path="m328.444 98.299 58.58-33.8a13.87 13.87 180 0 1 13.86 0l425 245.2a4.616 4.616 90 0 1 0 7.996l-130.3 75.15a4.607 4.607 89.95 0 0 .006 7.985l6.21 3.57"
            />
            <animate
              attributeName="fill"
              repeatCount="indefinite"
              dur="40s"
              values="#2d2d2d; #2d2d2d; #2d2d2d00; #2d2d2d00"
              keyTimes="0; 0.2; 0.2; 1"
            />
          </circle>
          <circle r="5" fill="#2d4d2d00" id="encryption-storage">
            <animateMotion
              dur="40s"
              calcMode="linear"
              repeatCount="indefinite"
              keyPoints="0;0;1;1"
              keyTimes="0;0.25;0.45;1"
              path="m832.7 487.6 13.22 7.424a13.67 13.67 59.66 0 1 6.976 11.92v399.7a13.85 13.85 59.99 0 0 6.929 12l18.9 10.9a13.85 13.85 59.99 0 1 6.929 12v44.47a13.85 13.85 120 0 1-6.929 12l-261.3 150.7a13.87 13.87 180 0 1-13.86 0l-386.1-222.8"
            />
            <animate
              attributeName="fill"
              repeatCount="indefinite"
              dur="40s"
              values="#2d4d2d00; #2d4d2d00; #2d4d2dff; #2d4d2dff; #2d4d2d00; #2d4d2d00"
              keyTimes="0; 0.25; 0.25; 0.45; 0.45; 1"
            />
          </circle>
          <circle r="5" fill="#2d4d2d00" id="storage-decryption">
            <animateMotion
              dur="40s"
              calcMode="linear"
              repeatCount="indefinite"
              keyPoints="0;0;1;1"
              keyTimes="0;0.5;0.7;1"
              path="m178.25 903.336-58.58-33.8a4.616 4.616 90 0 1 0-7.996l71.3-41.14a13.83 13.83 120 0 0 6.92-12l-.49-415.3"
            />
            <animate
              attributeName="fill"
              repeatCount="indefinite"
              dur="40s"
              values="#2d4d2d00; #2d4d2d00; #2d4d2d; #2d4d2d; #2d4d2d00; #2d4d2d00"
              keyTimes="0; 0.5; 0.5; 0.7; 0.7; 1"
            />
          </circle>
          <circle r="5" fill="#2d2d2d00" id="decryption-data">
            <animateMotion
              dur="40s"
              calcMode="linear"
              repeatCount="indefinite"
              keyPoints="0;0;1;1"
              keyTimes="0;0.75;0.95;1"
              path="m125.7 328.8-91.76-52.71a4.605 4.605 89.94 0 1-.008-7.983l209.2-120.7"
            />
            <animate
              attributeName="fill"
              repeatCount="indefinite"
              dur="40s"
              values="#2d2d2d00; #2d2d2d00; #2d2d2d; #2d2d2d; #2d2d2d00; #2d2d2d00"
              keyTimes="0; 0.75; 0.75; 0.95; 0.95; 1"
            />
          </circle>
          <path
            id="topLeftLine"
            d="m230.6 268.3 163.8 94.49 163.8-94.49"
            style={{
              fill: "none",
              fontVariationSettings: "normal",
              stopColor: "#000",
              strokeWidth: 2.001,
              stroke: "#6ee7b7",
            }}
          />
          <path
            id="bottomRightLine"
            d="m492.6 948.7 163.8 94.49 163.8-94.49"
            style={{
              fill: "none",
              fontVariationSettings: "normal",
              stopColor: "#000",
              strokeWidth: 2.001,
              stroke: "#6ee7b7",
            }}
          />
          <path
            id="storageContainer"
            d="m246.7 867.5 32.38 18.68a2.312 2.312 89.95 0 1 .003 4.004l-117 67.8a6.919 6.919 179.9 0 1-6.926.006l-32.38-18.68a2.312 2.312 89.95 0 1-.004-4.004l117-67.8a6.919 6.919 180 0 1 6.926-.006z"
            style={{
              fill: "currentColor",
              strokeWidth: 2.001,
              stroke: "#2d2d2d",
            }}
          >
            <animate
              attributeName="stroke"
              repeatCount="indefinite"
              dur="40s"
              values="#2d2d2d; #2d2d2d; #189d9daa; #2d2d2d; #2d2d2d"
              keyTimes="0; 0.45; 0.465; 0.49; 1"
            />
          </path>
          <text
            id="storageText"
            x={-836.008}
            y={896.049}
            transform="matrix(.866 -.5 1 .5774 0 0)"
          >
            <tspan fill="#fff">storage</tspan>
          </text>
          <path
            id="encryptionContainer"
            d="m685.6 417.7 130.6 75.37a6.931 6.931.006 0 0 6.929 0l25.82-14.9a2.308 2.308 90.01 0 0 0-3.998l-130.6-75.37a6.931 6.931.006 0 0-6.929-.001l-25.82 14.9a2.308 2.308 90.01 0 0 0 3.999z"
            style={{
              fill: "currentColor",
              strokeWidth: 2.001,
              stroke: "#2d2d2d",
            }}
          />
          <text
            id="encryptionText"
            x={833.968}
            y={8.566}
            transform="matrix(.866 .5 -1 .5774 0 0)"
          >
            <tspan fill="#fff">{encryption}</tspan>
          </text>
          <path
            id="decryptionContainer"
            d="m272.8 391.1-143.6-82.93a2.309 2.309 150 0 0-3.464 2v37.35a6.928 6.928 60 0 0 3.464 6l143.6 82.93a2.309 2.309 150 0 0 3.464-2V397.1a6.928 6.928 60 0 0-3.464-6z"
            style={{
              fill: "currentColor",
              strokeWidth: 2.001,
              stroke: "#2d2d2d",
            }}
          />
          <text
            id="decryptionText"
            x={145.076}
            y={261.451}
            transform="skewY(30)"
          >
            <tspan fill="#fff">{decryption}</tspan>
          </text>
          <path
            id="dataContainer"
            d="M328.4 111.3V79.61a2.31 2.31 30.01 0 0-3.465-2.001l-78.23 45.14a6.926 6.926 120 0 0-3.465 5.999v31.69a2.31 2.31 30.01 0 0 3.465 2.001l78.23-45.14a6.926 6.926 120 0 0 3.465-5.999z"
            style={{
              fill: "currentColor",
              strokeWidth: 2.001,
              stroke: "#2d2d2d",
            }}
          />
          <text id="dataText" x={263.187} y={291.388} transform="skewY(-30)">
            <tspan fill="#fff">data</tspan>
          </text>
        </g>
      </svg>
    </div>
  );
};

export default Illustration;
