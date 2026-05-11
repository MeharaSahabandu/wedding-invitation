"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

type ImportState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; imported: number; skipped: number; messaged: number }
  | { status: "error"; message: string };

export default function ImportButton() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [state, setState] = useState<ImportState>({ status: "idle" });
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  function openPicker() {
    inputRef.current?.click();
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset input so same file can be re-selected
    e.target.value = "";

    setState({ status: "loading" });
    setShowModal(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/import", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) {
        setState({ status: "error", message: data.error ?? "Upload failed" });
        return;
      }

      setState({
        status: "success",
        imported: data.imported,
        skipped: data.skipped,
        messaged: data.messaged ?? 0,
      });
      // Refresh the server component data
      router.refresh();
    } catch {
      setState({
        status: "error",
        message: "Network error. Please try again.",
      });
    }
  }

  function closeModal() {
    setShowModal(false);
    setState({ status: "idle" });
  }

  return (
    <>
      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept=".xlsx,.xls"
        className="hidden"
        onChange={handleFile}
      />

      {/* Import button */}
      <button
        onClick={openPicker}
        disabled={state.status === "loading"}
        className="flex items-center gap-1.5 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-600 hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
      >
        <UploadIcon />
        {state.status === "loading" ? "Importing…" : "Import"}
      </button>

      {/* Result modal */}
      {showModal && state.status !== "idle" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 text-sm">
                Import Guests
              </h3>
              {state.status !== "loading" && (
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <CloseIcon />
                </button>
              )}
            </div>

            {/* Body */}
            <div className="px-6 py-6">
              {state.status === "loading" && (
                <div className="flex flex-col items-center gap-3 py-4">
                  <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-700 rounded-full animate-spin" />
                  <p className="text-sm text-gray-500">Processing your file…</p>
                </div>
              )}

              {state.status === "success" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                      <CheckIcon />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        Import complete
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Your guest list has been updated.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-1 bg-green-50 rounded-xl px-4 py-3 text-center">
                      <p className="text-2xl font-bold text-green-700">
                        {state.imported}
                      </p>
                      <p className="text-xs text-green-600 mt-0.5">Imported</p>
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-xl px-4 py-3 text-center">
                      <p className="text-2xl font-bold text-gray-500">
                        {state.skipped}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">Skipped</p>
                    </div>
                  </div>
                  <button
                    onClick={closeModal}
                    className="w-full py-2.5 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors"
                  >
                    Done
                  </button>
                </div>
              )}

              {state.status === "error" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center shrink-0">
                      <ErrorIcon />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        Import failed
                      </p>
                      <p className="text-xs text-red-500 mt-0.5">
                        {state.message}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={closeModal}
                    className="w-full py-2.5 rounded-full border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function UploadIcon() {
  return (
    <svg
      className="w-3.5 h-3.5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
      />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg
      className="w-5 h-5 text-green-600"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}
function ErrorIcon() {
  return (
    <svg
      className="w-5 h-5 text-red-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
