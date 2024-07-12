import { useState } from "react";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast, { Toaster } from "react-hot-toast";

const languageTags = [
  { code: "en-US", name: "English (United States)" },
  { code: "en-GB", name: "English (United Kingdom)" },
  { code: "fr-CA", name: "French (Canada)" },
  { code: "fr-FR", name: "French (France)" },
  { code: "es-ES", name: "Spanish (Spain)" },
  { code: "es-MX", name: "Spanish (Mexico)" },
  { code: "de-DE", name: "German (Germany)" },
  { code: "de-AT", name: "German (Austria)" },
  { code: "it-IT", name: "Italian (Italy)" },
  { code: "pt-PT", name: "Portuguese (Portugal)" },
  { code: "pt-BR", name: "Portuguese (Brazil)" },
  { code: "ru-RU", name: "Russian (Russia)" },
  { code: "zh-CN", name: "Chinese (Simplified, China)" },
  { code: "zh-TW", name: "Chinese (Traditional, Taiwan)" },
  { code: "ja-JP", name: "Japanese (Japan)" },
  { code: "ko-KR", name: "Korean (South Korea)" },
  { code: "ar-SA", name: "Arabic (Saudi Arabia)" },
  { code: "nl-NL", name: "Dutch (Netherlands)" },
  { code: "sv-SE", name: "Swedish (Sweden)" },
  { code: "no-NO", name: "Norwegian (Norway)" },
  { code: "da-DK", name: "Danish (Denmark)" },
  { code: "fi-FI", name: "Finnish (Finland)" },
  { code: "el-GR", name: "Greek (Greece)" },
  { code: "tr-TR", name: "Turkish (Turkey)" },
  { code: "pl-PL", name: "Polish (Poland)" },
  { code: "cs-CZ", name: "Czech (Czech Republic)" },
  { code: "hu-HU", name: "Hungarian (Hungary)" },
  { code: "he-IL", name: "Hebrew (Israel)" },
  { code: "th-TH", name: "Thai (Thailand)" },
  { code: "vi-VN", name: "Vietnamese (Vietnam)" },
  { code: "id-ID", name: "Indonesian (Indonesia)" },
  { code: "ms-MY", name: "Malay (Malaysia)" },
  { code: "hi-IN", name: "Hindi (India)" },
  { code: "ta-IN", name: "Tamil (India)" },
  { code: "bn-IN", name: "Bengali (India)" },
  { code: "ur-PK", name: "Urdu (Pakistan)" },
];

function App() {
  const [to, setTo] = useState(languageTags[0].code);
  const [from, setFrom] = useState(languageTags[0].code);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  if (copied) {
    toast.success("Copied to Clipboard...");
    setCopied(false);
  }

  const translate = async () => {
    try {
      const { data } = await axios.get(
        `https://api.mymemory.translated.net/get?q=${input}&langpair=${from}|${to}`
      );
      console.log(data?.responseData?.translatedText);
      setOutput(data?.responseData?.translatedText);
    } catch (error) {
      console.error("Error translating text:", error);
    }
  };

  return (
    <div className="text-center p-4">
      <Toaster />
      <div className="md:flex justify-between gap-5">
        <div className="md:flex-1 bg-white border border-gray-300 rounded-lg shadow-lg p-5 m-2.5 text-center hover:shadow-2xl">
          <p className="text-2xl text-gray-800 leading-loose mb-2.5 text-left">
            Enter text into the box...
          </p>
          <textarea
            className="w-full p-2.5 border border-gray-300 rounded-lg shadow-inner text-lg resize-y mt-2.5 focus:outline-none focus:border-blue-400 focus:shadow-outline-blue"
            rows="10"
            cols="50"
            onInput={(e) => setInput(e.target.value)}
          ></textarea>
        </div>
        <div className="flex-1 bg-white border border-gray-300 rounded-lg shadow-lg p-5 m-2.5 text-center hover:shadow-2xl">
          <p className="text-2xl text-gray-800 leading-loose mb-2.5 text-left">
            Translation
          </p>
          <textarea
            className="w-full p-2.5 border border-gray-300 rounded-lg shadow-inner text-lg resize-y mt-2.5 focus:outline-none focus:border-blue-400 focus:shadow-outline-blue"
            rows="10"
            cols="50"
            value={output}
          ></textarea>
          <div className="mt-4">
            <CopyToClipboard text={output} onCopy={() => setCopied(true)}>
              <button className="button-17 inline-flex items-center bg-white rounded-full border-none shadow-md p-0.5 text-gray-800 cursor-pointer font-sans font-medium h-12 justify-center text-base tracking-wide transition transform will-change-transform will-change-opacity z-0 max-w-full overflow-visible px-6 focus:outline-none focus:border-blue-600 focus:shadow-outline-blue hover:bg-blue-50 hover:text-blue-700 active:shadow-lg disabled:shadow-md">
                Copy Text
              </button>
            </CopyToClipboard>
          </div>
        </div>
      </div>
      <div className="md:flex justify-center items-center gap-2 mt-4">
        <div className="text-lg">From ({from}):</div>
        <select
          onChange={(e) => setFrom(e.target.value)}
          className="p-2.5 border border-gray-300 rounded-lg"
        >
          {languageTags.map((opt) => (
            <option key={opt.code} value={opt.code}>
              {opt.name}
            </option>
          ))}
        </select>
        <div className="text-lg">To ({to}):</div>
        <select
          onChange={(e) => setTo(e.target.value)}
          className="p-2.5 border border-gray-300 rounded-lg"
        >
          {languageTags.map((opt) => (
            <option key={opt.code} value={opt.code}>
              {opt.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-4">
        <button
          onClick={(e) => translate()}
          className="button-17 inline-flex items-center bg-white rounded-full border-none shadow-md p-0.5 text-gray-800 cursor-pointer font-sans font-medium h-12 justify-center text-base tracking-wide transition transform will-change-transform will-change-opacity z-0 max-w-full overflow-visible px-6 focus:outline-none focus:border-blue-600 focus:shadow-outline-blue hover:bg-blue-50 hover:text-blue-700 active:shadow-lg disabled:shadow-md"
        >
          Translate
        </button>
      </div>
    </div>
  );
}

export default App;
