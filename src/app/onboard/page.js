import { currentUser, fetchUser } from "@/actions";
import OnboardCard from "@/components/onboard-card";
import { redirect } from "next/navigation";

const BENEFITS = [
  {
    icon: "🧬",
    label: "Personalised Plan",
    desc: "AI-tailored to your unique body metrics",
  },
  {
    icon: "📊",
    label: "Real-time Insights",
    desc: "Track every change as you progress",
  },
  {
    icon: "🏆",
    label: "Goal Tracking",
    desc: "Set milestones and celebrate wins",
  },
  {
    icon: "🔬",
    label: "Clinical Accuracy",
    desc: "Backed by certified health science",
  },
];

const METRICS = [
  { value: "2.4M+", label: "Assessments Done" },
  { value: "94%", label: "Accuracy Rate" },
  { value: "180+", label: "Countries" },
];

const STEPS = [
  { num: "01", title: "Body Metrics", active: true },
  { num: "02", title: "Health Goals", active: false },
  { num: "03", title: "Your Plan", active: false },
];

export default async function OnboardPage() {
  // ── LOGIC UNCHANGED ──────────────────────────────────────────────────────
  const user = await currentUser();
  if (!user) redirect("/sign-up");

  const ProfileUser = await fetchUser(user?.userId);
  if (ProfileUser?._id) redirect("/");
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;1,9..144,300&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --bg:        #080C12;
          --bg-card:   #0E1420;
          --bg-raised: #141B28;
          --green:     #0BDA8C;
          --green-dim: rgba(11,218,140,0.1);
          --green-glow:rgba(11,218,140,0.22);
          --amber:     #F5A623;
          --text:      #EDF0F7;
          --text-2:    #8892A4;
          --text-3:    #3D4A5C;
          --border:    rgba(255,255,255,0.06);
          --border-g:  rgba(11,218,140,0.18);
          --ff-d:      'Fraunces', serif;
          --ff-b:      'Outfit', sans-serif;
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(30px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes slideRight {
          from { opacity:0; transform:translateX(-26px); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes slideLeft {
          from { opacity:0; transform:translateX(26px); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes blink  { 0%,100%{opacity:1;} 50%{opacity:0.25;} }
        @keyframes floatOrb {
          0%,100%{transform:translate(0,0);} 40%{transform:translate(40px,-30px);} 70%{transform:translate(-20px,25px);}
        }
        @keyframes shimmerBar {
          from{background-position:-200% center;} to{background-position:200% center;}
        }
        @keyframes countUp {
          from{opacity:0;transform:translateY(8px);} to{opacity:1;transform:translateY(0);}
        }
        @keyframes pulseGreen {
          0%,100%{box-shadow:0 0 0 0 var(--green-glow);} 60%{box-shadow:0 0 0 8px transparent;}
        }

        .vi-root {
          font-family: var(--ff-b);
          background: var(--bg);
          min-height: 100vh;
          display: flex;
          overflow: hidden;
          color: var(--text);
          position: relative;
        }
        .vi-orb {
          position: fixed; border-radius:50%;
          pointer-events:none; z-index:0; filter:blur(90px);
        }
        .vi-orb-1 {
          width:580px;height:580px;
          background:radial-gradient(circle,rgba(11,218,140,0.08) 0%,transparent 70%);
          top:-180px;left:-80px;
          animation:floatOrb 20s ease-in-out infinite;
        }
        .vi-orb-2 {
          width:480px;height:480px;
          background:radial-gradient(circle,rgba(245,166,35,0.07) 0%,transparent 70%);
          bottom:-100px;right:-80px;
          animation:floatOrb 26s ease-in-out infinite reverse;
        }
        .vi-dots {
          position:fixed;inset:0;z-index:0;pointer-events:none;
          background-image:radial-gradient(rgba(255,255,255,0.022) 1px,transparent 1px);
          background-size:30px 30px;
        }

        /* LEFT */
        .vi-left {
          flex:1; max-width:580px;
          display:flex; flex-direction:column; justify-content:center;
          padding:60px 56px 60px 64px;
          position:relative; z-index:1;
        }
        .vi-logo {
          display:flex; align-items:center; gap:10px;
          margin-bottom:52px;
          animation:slideRight .6s cubic-bezier(.22,1,.36,1) both;
        }
        .vi-logo-mark {
          width:40px;height:40px;border-radius:12px;
          background:var(--green-dim); border:1px solid var(--border-g);
          display:flex;align-items:center;justify-content:center;font-size:20px;
        }
        .vi-logo-name {
          font-family:var(--ff-d);font-size:20px;font-weight:700;
          color:var(--text);letter-spacing:-0.3px;
        }
        .vi-logo-name span{color:var(--green);}

        .vi-badge {
          display:inline-flex;align-items:center;gap:8px;
          padding:5px 14px 5px 8px;
          background:var(--green-dim);border:1px solid var(--border-g);
          border-radius:100px;font-size:11px;font-weight:600;
          color:var(--green);letter-spacing:.6px;text-transform:uppercase;
          width:fit-content;margin-bottom:22px;
          animation:slideRight .6s .08s cubic-bezier(.22,1,.36,1) both;
        }
        .vi-badge-dot {
          width:7px;height:7px;border-radius:50%;background:var(--green);
          animation:blink 1.6s ease-in-out infinite;
        }

        .vi-headline {
          font-family:var(--ff-d);
          font-size:clamp(36px,4.2vw,54px);
          font-weight:700; font-style:italic;
          color:var(--text); line-height:1.06;
          letter-spacing:-1.5px; margin-bottom:18px;
          animation:fadeUp .7s .14s cubic-bezier(.22,1,.36,1) both;
        }
        .vi-headline em { font-style:normal; color:var(--green); }

        .vi-sub {
          font-size:15px; color:var(--text-2);
          line-height:1.7; font-weight:300;
          max-width:420px; margin-bottom:38px;
          animation:fadeUp .7s .2s cubic-bezier(.22,1,.36,1) both;
        }

        /* Step tracker */
        .vi-steps {
          display:flex; align-items:center; gap:0;
          margin-bottom:40px;
          animation:fadeUp .7s .26s cubic-bezier(.22,1,.36,1) both;
        }
        .vi-step { display:flex; align-items:center; gap:10px; }
        .vi-step-n {
          width:36px;height:36px;border-radius:10px;
          display:flex;align-items:center;justify-content:center;
          font-size:12px;font-weight:700;
          border:1px solid var(--border); color:var(--text-3);
          background:var(--bg-raised,#141B28);
        }
        .vi-step.on .vi-step-n {
          background:var(--green-dim);border-color:var(--border-g);
          color:var(--green);
          animation:pulseGreen 2s ease-in-out infinite;
        }
        .vi-step-lbl { font-size:12px;font-weight:500;color:var(--text-3); }
        .vi-step.on .vi-step-lbl { color:var(--text); }
        .vi-step-conn { width:36px;height:1px;background:var(--border);margin:0 4px; }

        /* Stats */
        .vi-stats {
          display:flex; margin-bottom:40px;
          animation:fadeUp .7s .32s cubic-bezier(.22,1,.36,1) both;
        }
        .vi-stat {
          flex:1;padding:18px 20px;
          background:var(--bg-card,#0E1420);
          border:1px solid var(--border);
          position:relative; overflow:hidden;
        }
        .vi-stat:first-child{border-radius:14px 0 0 14px;}
        .vi-stat:last-child{border-radius:0 14px 14px 0;}
        .vi-stat+.vi-stat{border-left:none;}
        .vi-stat::before{
          content:'';position:absolute;top:0;left:0;right:0;height:2px;
          background:linear-gradient(90deg,transparent,var(--green),transparent);
          opacity:0;transition:opacity .3s;
        }
        .vi-stat:hover::before{opacity:1;}
        .vi-stat-v {
          font-family:var(--ff-d);font-size:24px;font-weight:700;
          color:var(--text);letter-spacing:-.5px;margin-bottom:3px;
          animation:countUp .6s .6s both;
        }
        .vi-stat-l { font-size:11px;color:var(--text-2);font-weight:500;text-transform:uppercase;letter-spacing:.5px; }

        /* Benefits */
        .vi-benefits {
          display:grid;grid-template-columns:1fr 1fr;gap:10px;
          margin-bottom:38px;
          animation:fadeUp .7s .38s cubic-bezier(.22,1,.36,1) both;
        }
        .vi-benefit {
          display:flex;gap:12px;padding:15px;
          background:var(--bg-card,#0E1420);
          border:1px solid var(--border);border-radius:14px;
          transition:border-color .25s,transform .25s;cursor:default;
        }
        .vi-benefit:hover{border-color:var(--border-g);transform:translateY(-2px);}
        .vi-benefit-icon{font-size:21px;flex-shrink:0;margin-top:1px;}
        .vi-benefit-name{font-size:12.5px;font-weight:600;color:var(--text);margin-bottom:3px;}
        .vi-benefit-desc{font-size:11.5px;color:var(--text-2);line-height:1.5;}

        /* Social proof */
        .vi-proof {
          display:flex;align-items:center;gap:14px;
          padding:13px 16px;
          background:var(--bg-card,#0E1420);
          border:1px solid var(--border);border-radius:14px;
          animation:fadeUp .7s .44s cubic-bezier(.22,1,.36,1) both;
        }
        .vi-av-stack{display:flex;}
        .vi-av {
          width:30px;height:30px;border-radius:50%;
          border:2px solid var(--bg-card,#0E1420);
          display:flex;align-items:center;justify-content:center;
          font-size:11px;font-weight:700;color:#fff;
        }
        .vi-av+.vi-av{margin-left:-9px;}
        .vi-proof-txt{flex:1;font-size:12.5px;color:var(--text-2);line-height:1.4;}
        .vi-proof-txt strong{color:var(--text);font-weight:600;}
        .vi-proof-stars{font-size:12px;color:var(--amber);}

        /* RIGHT */
        .vi-right {
          width:500px;flex-shrink:0;
          display:flex;align-items:center;justify-content:center;
          padding:40px 56px 40px 28px;
          position:relative;z-index:1;
        }
        .vi-form-shell {
          width:100%;max-width:440px;
          animation:slideLeft .7s .18s cubic-bezier(.22,1,.36,1) both;
        }
        .vi-card {
          background:var(--bg-card,#0E1420);
          border:1px solid var(--border);
          border-radius:24px;padding:34px 30px;
          position:relative;overflow:hidden;
          box-shadow:0 40px 80px rgba(0,0,0,.55);
        }
        .vi-card::before {
          content:'';position:absolute;
          top:0;left:0;right:0;height:1px;
          background:linear-gradient(90deg,transparent,var(--green),transparent);
        }
        .vi-card::after {
          content:'';position:absolute;
          top:-60px;left:-60px;width:180px;height:180px;border-radius:50%;
          background:radial-gradient(circle,var(--green-glow) 0%,transparent 70%);
          pointer-events:none;
        }
        .vi-card-eyebrow {
          font-size:11px;font-weight:600;color:var(--green);
          letter-spacing:1px;text-transform:uppercase;margin-bottom:7px;
        }
        .vi-card-title {
          font-family:var(--ff-d);font-size:22px;font-weight:700;
          color:var(--text);letter-spacing:-.4px;margin-bottom:4px;
        }
        .vi-card-sub { font-size:13px;color:var(--text-2);margin-bottom:22px; }
        .vi-prog { display:flex;gap:6px;margin-bottom:26px; }
        .vi-prog-bar {
          height:3px;border-radius:3px;background:var(--border);
        }
        .vi-prog-bar:first-child {
          flex:2;
          background:linear-gradient(90deg,var(--green),rgba(11,218,140,.35));
          background-size:200% auto;
          animation:shimmerBar 2s linear infinite;
        }
        .vi-prog-bar:not(:first-child){flex:1;}
        .vi-trust {
          display:flex;justify-content:center;gap:20px;margin-top:16px;
        }
        .vi-trust-item{
          display:flex;align-items:center;gap:5px;
          font-size:11px;color:var(--text-3);
        }

        @media(max-width:1024px){
          .vi-root{flex-direction:column;overflow-y:auto;}
          .vi-left{max-width:100%;padding:48px 28px 32px;}
          .vi-right{width:100%;padding:0 24px 56px;}
        }
        @media(max-width:540px){
          .vi-benefits{grid-template-columns:1fr;}
          .vi-stats{flex-direction:column;}
          .vi-stat:first-child{border-radius:14px 14px 0 0;}
          .vi-stat:last-child{border-radius:0 0 14px 14px;}
          .vi-stat+.vi-stat{border-left:1px solid var(--border);border-top:none;}
        }
      `}</style>

      <div className="vi-root">
        <div className="vi-dots" />
        <div className="vi-orb vi-orb-1" />
        <div className="vi-orb vi-orb-2" />

        {/* ══════════ LEFT PANEL ══════════ */}
        <div className="vi-left" style={{ marginTop: 40 }}>
          <div className="vi-badge">
            <span className="vi-badge-dot" />
            Free — no card required
          </div>

          <h1 className="vi-headline">
            Know your body.
            <br />
            <em>Transform</em>
            <br />
            your health.
          </h1>

          <p className="vi-sub">
            Answer a few questions about your body and we'll generate a
            clinically-grounded health profile — your personalised roadmap to
            peak wellbeing.
          </p>

          {/* Step progress */}
          <div className="vi-steps">
            {STEPS.map((s, i) => (
              <>
                {i > 0 && <div key={`c${i}`} className="vi-step-conn" />}
                <div key={s.num} className={`vi-step${s.active ? " on" : ""}`}>
                  <div className="vi-step-n">{s.num}</div>
                  <span className="vi-step-lbl">{s.title}</span>
                </div>
              </>
            ))}
          </div>

          {/* Stats */}
          <div className="vi-stats">
            {METRICS.map((m) => (
              <div key={m.label} className="vi-stat">
                <div className="vi-stat-v">{m.value}</div>
                <div className="vi-stat-l">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Benefits grid */}
          <div className="vi-benefits">
            {BENEFITS.map((b) => (
              <div key={b.label} className="vi-benefit">
                <span className="vi-benefit-icon">{b.icon}</span>
                <div>
                  <div className="vi-benefit-name">{b.label}</div>
                  <div className="vi-benefit-desc">{b.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Social proof */}
          <div className="vi-proof">
            <div className="vi-av-stack">
              {[
                ["#0BDA8C", "A"],
                ["#F5A623", "R"],
                ["#5E9EFF", "K"],
              ].map(([c, l], i) => (
                <div key={i} className="vi-av" style={{ background: c }}>
                  {l}
                </div>
              ))}
            </div>
            <div className="vi-proof-txt">
              <strong>2.4 million people</strong> completed their health
              assessment this year.{" "}
              <span className="vi-proof-stars">★★★★★</span>
            </div>
          </div>
        </div>

        {/* ══════════ RIGHT PANEL ══════════ */}
        <div className="vi-right">
          <div className="vi-form-shell">
            <div className="vi-card">
              <div className="vi-card-eyebrow">Step 1 of 3</div>
              <div className="vi-card-title">Body Metrics</div>
              <div className="vi-card-sub">
                Tell us about yourself to personalise your health report.
              </div>
              <div className="vi-prog">
                <div className="vi-prog-bar" />
                <div className="vi-prog-bar" />
                <div className="vi-prog-bar" />
              </div>

              {/* ── ONBOARD CARD — all logic untouched ── */}
              <OnboardCard userid={user?.userId} email={user.email} />
            </div>

            <div className="vi-trust">
              <div className="vi-trust-item">🔒 Encrypted</div>
              <div className="vi-trust-item">🩺 Clinically reviewed</div>
              <div className="vi-trust-item">🚫 No spam</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
