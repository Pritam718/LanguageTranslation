import { useState } from "react";
import "./App.css";
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
    <div className="App">
      <Toaster />
      <div class="container">
        <div class="box">
          <p>Enter text into box...</p>
          <textarea
            class="styled-textarea"
            rows="15"
            cols="50"
            onInput={(e) => setInput(e.target.value)}
          ></textarea>
        </div>
        <div class="box">
          <p>Translation</p>
          <textarea
            class="styled-textarea"
            rows="15"
            cols="50"
            value={output}
          ></textarea>
          <div>
            <CopyToClipboard text={copied} onCopy={() => setCopied(true)}>
              <button
                onClick={() => toast.success("Copied Clipboard...")}
                class="button-17"
              >
                Copied Text
              </button>
            </CopyToClipboard>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "7px",
        }}
      >
        <div class="from">From ({from}):</div>
        <select onChange={(e) => setFrom(e.target.value)}>
          {languageTags.map((opt) => (
            <option key={opt.code} value={opt.code}>
              {opt.name}
            </option>
          ))}
        </select>
        <div class="from">To ({to}):</div>
        <select onChange={(e) => setTo(e.target.value)}>
          {languageTags.map((opt) => (
            <option key={opt.code} value={opt.code}>
              {opt.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button onClick={(e) => translate()} class="button-17" role="button">
          Translate
        </button>
      </div>
    </div>
  );
}

export default App;
