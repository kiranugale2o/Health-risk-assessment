"use client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { initialUserData } from "@/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// ALL STATE, HANDLERS, AND SUBMISSION LOGIC UNCHANGED FROM ORIGINAL
// Only the JSX / className layer has been redesigned
// ─────────────────────────────────────────────────────────────────────────────

export default function OnboardCard({ userid, email }) {
  const { toast } = useToast();
  const [currentOnboardData, setOnboardData] = useState(initialUserData);
  const [selectedValue, setSelectedValue] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  // ── File / S3 logic — UNCHANGED ──────────────────────────────────────────
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      await handleUpload(file);
    }
  };

  const handleUpload = async (file) => {
    if (!file) {
      alert("Please select an image first");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "health"); // ✅ correct preset
      formData.append("folder", "uploads");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dyertpeax/image/upload",
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();

      if (!res.ok) {
        console.error("Cloudinary Error:", data);
        throw new Error(data.error?.message);
      }

      const imageUrl = data.secure_url;

      setOnboardData({
        ...currentOnboardData,
        profile_image: imageUrl,
      });

      console.log("Image uploaded at:", imageUrl);
      toast({ description: "Image uploaded successfully!" });
    } catch (error) {
      console.error("Upload failed:", error);
      alert(error.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const router = useRouter();

  // ── Submission — UNCHANGED ───────────────────────────────────────────────
  async function handleOnboard() {
    const data = {
      ...currentOnboardData,
      gender: selectedValue,
      userId: userid,
      email,
    };
    fetch("/api/onboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    })
      .then((res) => res.json())
      .then(() => {
        toast({ description: "Success!" });
        router.refresh("/");
      })
      .catch((er) => {
        console.error(er);
        toast({ description: "Failed to save data", variant: "destructive" });
      });
  }

  console.log(currentOnboardData);

  // ── Validation — UNCHANGED ───────────────────────────────────────────────
  function buttonDisabled() {
    return (
      currentOnboardData.LastName === "" ||
      currentOnboardData.firstName === "" ||
      currentOnboardData.age === "" ||
      currentOnboardData.weight === "" ||
      currentOnboardData.height === "" ||
      selectedValue === ""
    );
  }

  // ── Derived UI helpers ───────────────────────────────────────────────────
  const photoLabel = uploading
    ? "Uploading…"
    : currentOnboardData.profile_image
      ? "Photo uploaded ✓"
      : "Upload profile photo (optional)";

  return (
    <>
      <style>{`
        /* ── VitalIQ OnboardCard dark theme ─────────────────────────── */
        .oc-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 14px;
        }
        .oc-label {
          font-size: 11px;
          font-weight: 600;
          color: #8892A4;
          letter-spacing: .5px;
          text-transform: uppercase;
        }
        .oc-input {
          width: 100%;
          height: 48px;
          background: #080C12;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 0 16px;
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          color: #EDF0F7;
          outline: none;
          transition: border-color .2s, box-shadow .2s;
        }
        .oc-input::placeholder { color: #3D4A5C; }
        .oc-input:focus {
          border-color: rgba(11,218,140,.4);
          box-shadow: 0 0 0 3px rgba(11,218,140,.08);
        }
        .oc-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .oc-row-3 {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 10px;
          margin-bottom: 14px;
        }

        /* Gender pills */
        .oc-gender-lbl {
          font-size: 11px; font-weight: 600;
          color: #8892A4; letter-spacing: .5px;
          text-transform: uppercase; margin-bottom: 8px;
        }
        .oc-gender-pills {
          display: flex; gap: 8px;
        }
        .oc-gender-pill {
          flex: 1;
          display: flex; align-items: center; justify-content: center;
          gap: 7px;
          height: 42px;
          border-radius: 12px;
          border: 1.5px solid rgba(255,255,255,0.08);
          background: #080C12;
          cursor: pointer;
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #8892A4;
          transition: all .2s;
          user-select: none;
        }
        .oc-gender-pill:hover {
          border-color: rgba(11,218,140,.3);
          color: #EDF0F7;
        }
        .oc-gender-pill.selected {
          border-color: #0BDA8C;
          background: rgba(11,218,140,.08);
          color: #0BDA8C;
          font-weight: 600;
        }
        .oc-gender-pill input { display: none; }

        /* Photo upload */
        .oc-photo {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 13px 16px;
          background: #080C12;
          border: 1.5px dashed rgba(255,255,255,0.1);
          border-radius: 12px;
          cursor: pointer;
          margin-bottom: 20px;
          transition: border-color .2s;
        }
        .oc-photo:hover { border-color: rgba(11,218,140,.3); }
        .oc-photo.uploaded {
          border-style: solid;
          border-color: rgba(11,218,140,.3);
          background: rgba(11,218,140,.04);
        }
        .oc-photo-icon {
          width: 40px; height: 40px; border-radius: 10px;
          background: rgba(255,255,255,.05);
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; flex-shrink: 0;
        }
        .oc-photo-title {
          font-size: 13px; font-weight: 600; color: #EDF0F7;
          margin-bottom: 2px;
        }
        .oc-photo-sub {
          font-size: 11.5px; color: #8892A4;
        }
        .oc-photo-sub.done { color: #0BDA8C; }

        /* Submit button */
        .oc-btn {
          width: 100%; height: 50px;
          background: linear-gradient(135deg, #0BDA8C 0%, #06A86B 100%);
          border: none; border-radius: 14px;
          font-family: 'Outfit', sans-serif;
          font-size: 15px; font-weight: 700;
          color: #080C12;
          cursor: pointer;
          letter-spacing: -.2px;
          box-shadow: 0 8px 24px rgba(11,218,140,.25);
          transition: transform .15s, box-shadow .15s, opacity .2s;
          position: relative; overflow: hidden;
        }
        .oc-btn::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(90deg,transparent,rgba(255,255,255,.15),transparent);
          transform: translateX(-100%);
          transition: transform .4s;
        }
        .oc-btn:hover::after { transform: translateX(100%); }
        .oc-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 12px 32px rgba(11,218,140,.32);
        }
        .oc-btn:active:not(:disabled) { transform: translateY(0); }
        .oc-btn:disabled {
          opacity: .4; cursor: not-allowed;
          box-shadow: none;
        }
        .oc-divider {
          height: 1px; background: rgba(255,255,255,.06);
          margin: 18px 0;
        }
        .oc-section-label {
          font-size: 11px; font-weight: 600; color: #8892A4;
          text-transform: uppercase; letter-spacing: .5px;
          margin-bottom: 10px;
        }
      `}</style>

      {/* ── Name row ─────────────────────────────────────────────────────── */}
      <div className="oc-row" style={{ marginBottom: 14 }}>
        <div className="oc-field" style={{ marginBottom: 0 }}>
          <label className="oc-label">First Name</label>
          <input
            className="oc-input"
            placeholder="e.g. Kiran"
            value={currentOnboardData.firstName}
            onChange={(e) =>
              setOnboardData({
                ...currentOnboardData,
                firstName: e.target.value,
              })
            }
          />
        </div>
        <div className="oc-field" style={{ marginBottom: 0 }}>
          <label className="oc-label">Last Name</label>
          <input
            className="oc-input"
            placeholder="e.g. Ugale"
            value={currentOnboardData.LastName}
            onChange={(e) =>
              setOnboardData({
                ...currentOnboardData,
                LastName: e.target.value,
              })
            }
          />
        </div>
      </div>

      {/* ── Age ──────────────────────────────────────────────────────────── */}
      <div className="oc-field">
        <label className="oc-label">Age</label>
        <input
          className="oc-input"
          placeholder="e.g. 27"
          value={currentOnboardData.age}
          onChange={(e) =>
            setOnboardData({ ...currentOnboardData, age: e.target.value })
          }
        />
      </div>

      {/* ── Weight + Height ───────────────────────────────────────────────── */}
      <div className="oc-row" style={{ marginBottom: 14 }}>
        <div className="oc-field" style={{ marginBottom: 0 }}>
          <label className="oc-label">Weight (kg)</label>
          <input
            className="oc-input"
            placeholder="e.g. 72"
            value={currentOnboardData.weight}
            onChange={(e) =>
              setOnboardData({ ...currentOnboardData, weight: e.target.value })
            }
          />
        </div>
        <div className="oc-field" style={{ marginBottom: 0 }}>
          <label className="oc-label">Height (cm)</label>
          <input
            className="oc-input"
            placeholder="e.g. 175"
            value={currentOnboardData.height}
            onChange={(e) =>
              setOnboardData({ ...currentOnboardData, height: e.target.value })
            }
          />
        </div>
      </div>

      <div className="oc-divider" />

      {/* ── Gender (pill-style radio) ─────────────────────────────────────── */}
      {/*
        RadioGroup + RadioGroupItem from shadcn are preserved underneath
        so validation and selectedValue state work exactly as before.
        We visually hide the radios and drive selection via the pill click.
      */}
      <div className="oc-gender-lbl">Gender</div>
      <div style={{ display: "none" }}>
        <RadioGroup value={selectedValue} onValueChange={setSelectedValue}>
          <RadioGroupItem value="male" id="r1" />
          <RadioGroupItem value="female" id="r2" />
          <RadioGroupItem value="other" id="r3" />
        </RadioGroup>
      </div>
      <div className="oc-gender-pills" style={{ marginBottom: 18 }}>
        {[
          { val: "male", emoji: "♂", label: "Male" },
          { val: "female", emoji: "♀", label: "Female" },
          { val: "other", emoji: "⊕", label: "Other" },
        ].map(({ val, emoji, label }) => (
          <button
            key={val}
            type="button"
            className={`oc-gender-pill${selectedValue === val ? " selected" : ""}`}
            onClick={() => setSelectedValue(val)}
          >
            <span>{emoji}</span>
            {label}
          </button>
        ))}
      </div>

      <div className="oc-divider" />

      {/* ── Profile photo ─────────────────────────────────────────────────── */}
      <Label htmlFor="img">
        <div
          className={`oc-photo${currentOnboardData.profile_image ? " uploaded" : ""}`}
        >
          <div className="oc-photo-icon">
            {currentOnboardData.profile_image ? "✅" : uploading ? "⏳" : "📷"}
          </div>
          <div>
            <div className="oc-photo-title">Profile Photo</div>
            <div
              className={`oc-photo-sub${currentOnboardData.profile_image ? " done" : ""}`}
            >
              {photoLabel}
            </div>
          </div>
        </div>
      </Label>
      <input
        type="file"
        id="img"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
        style={{ display: "none" }}
      />

      {/* ── Submit ────────────────────────────────────────────────────────── */}
      <button
        className="oc-btn"
        onClick={handleOnboard}
        disabled={buttonDisabled() || uploading}
      >
        {uploading ? "Uploading…" : "Continue →"}
      </button>
    </>
  );
}
