import { useState, useEffect, useRef } from "react";

const SECTIONS = ["Work", "Videos", "Services", "About", "Contact"];

// ── Add your video filenames here. Place files in: public/videos/ ──────────
// ── Example: { src: "/videos/my-video.mp4", poster: "/videos/my-thumb.jpg" }
// ── poster is optional — a frame from the video will show if omitted ────────
const videos = [
  { src: "/videos/video2.mp4", poster: "", title: "Product Spotlight", category: "Video Ad", platform: "Instagram Reel" },
  { src: "/videos/video3.mp4", poster: "", title: "Product Review", category: "Lifestyle", platform: "TikTok" },
  { src: "/videos/video1.mp4", poster: "", title: "Unboxing & First Impressions", category: "Product Demo", platform: "TikTok" },
];
const VIDEO_FILTERS = ["All", "Video Ad", "Lifestyle", "Product Demo"];

const stats = [
  { value: "10K+", label: "Instagram Followers" },
  { value: "2", label: "Content Verticals" },
  { value: "∞", label: "Creative Energy" },
  { value: "100%", label: "Authentic Voice" },
];

const services = [
  {
    id: "01",
    title: "Video Ads",
    desc: "Short-form video ads built for scroll-stopping performance. From hook to CTA, every second is intentional.",
    tags: ["Reels", "TikTok", "Product Spotlight", "Brand Story"],
  },
  {
    id: "02",
    title: "Product Demos",
    desc: "Hands-on demos that show, not tell. Real reactions, real environment, real trust-building.",
    tags: ["Unboxing", "Tutorial", "Before/After", "Review"],
  },
  {
    id: "03",
    title: "Lifestyle Content",
    desc: "Aspirational visuals woven into everyday life. Your product, my world — seamless and authentic.",
    tags: ["Day-in-Life", "GRWM", "Aesthetic Shots", "Travel"],
  },
  {
    id: "04",
    title: "Podcast Integration",
    desc: "Natural brand mentions and deep-dives on Smoke & Honesty — where real talk drives real engagement.",
    tags: ["Host Read", "Episode Feature", "Promo Segment"],
  },
];

const portfolio = [
  { category: "Video Ad", niche: "Fashion", aspect: "9:16", bg: "#1a1208", accent: "#C9A84C" },
  { category: "Lifestyle", niche: "Travel", aspect: "1:1", bg: "#0d1a14", accent: "#4CAF84" },
  { category: "Product Demo", niche: "Tech", aspect: "9:16", bg: "#0d0d1a", accent: "#7B84C9" },
  { category: "Video Ad", niche: "Grooming", aspect: "1:1", bg: "#1a0d0d", accent: "#C94C4C" },
  { category: "Lifestyle", niche: "Food & Beverage", aspect: "9:16", bg: "#1a1208", accent: "#C9A84C" },
  { category: "Product Demo", niche: "Wellness", aspect: "1:1", bg: "#0d1a14", accent: "#4CAF84" },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function UGCPortfolio() {
  const [activeFilter, setActiveFilter] = useState("All");

  function VideoCard({ v, featured = false }) {
    const videoRef = useRef(null);
    const [playing, setPlaying] = useState(false);

    const handlePlay = () => {
      if (videoRef.current) {
        videoRef.current.play();
        setPlaying(true);
      }
    };

    return (
      <div className="video-card">
        <div className="video-thumb" style={{ aspectRatio: featured ? "16/9" : "16/9" }}>
          <video
            ref={videoRef}
            src={v.src}
            poster={v.poster || undefined}
            controls={playing}
            preload="metadata"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            onEnded={() => setPlaying(false)}
          />
          {!playing && (
            <div className="play-cover" onClick={handlePlay}>
              <div className="play-btn-circle" style={featured ? {} : { width: 40, height: 40 }}>
                <div style={{
                  width: 0, height: 0, borderStyle: "solid",
                  borderWidth: featured ? "9px 0 9px 16px" : "6px 0 6px 11px",
                  borderColor: "transparent transparent transparent #C9A84C",
                  marginLeft: featured ? "3px" : "2px"
                }} />
              </div>
            </div>
          )}
        </div>
        <div style={{ padding: featured ? "20px 24px 24px" : "14px 18px 18px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: featured ? "8px" : "4px" }}>
            <span style={{ fontSize: featured ? "10px" : "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A84C" }}>{v.category}</span>
            <span style={{ fontSize: featured ? "10px" : "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#444" }}>{v.platform}</span>
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: featured ? "20px" : "16px", fontWeight: 400, color: "#F0EAD6" }}>{v.title}</div>
        </div>
      </div>
    );
  }

  const handleMediaKitDownload = () => {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<title>Javar Brown-Scott — UGC Media Kit 2026</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Syne:wght@400;600;700&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:#080808;color:#F0EAD6;font-family:'Syne',sans-serif;padding:60px;max-width:900px;margin:auto}
  .logo{font-family:'Cormorant Garamond',serif;font-size:64px;font-weight:300;line-height:1}
  .logo em{color:#C9A84C;font-style:italic}
  .label{font-size:10px;letter-spacing:.3em;text-transform:uppercase;color:#C9A84C;margin-bottom:12px;display:block}
  .divider{width:40px;height:1px;background:#C9A84C;margin:24px 0}
  .section{margin:56px 0}
  h2{font-family:'Cormorant Garamond',serif;font-size:36px;font-weight:300;margin-bottom:20px}
  p{font-size:14px;line-height:2;color:#888;margin-bottom:12px}
  .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin-top:24px}
  .stat{border:1px solid #1a1a1a;padding:28px 24px;text-align:center}
  .stat-val{font-family:'Cormorant Garamond',serif;font-size:48px;font-weight:300;color:#C9A84C}
  .stat-lbl{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#555;margin-top:6px}
  .service{border:1px solid #1a1a1a;padding:24px;margin-bottom:2px}
  .tag{display:inline-block;padding:3px 10px;border:1px solid #2a2a2a;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:#555;margin:2px}
  .footer{border-top:1px solid #1a1a1a;padding-top:32px;margin-top:64px;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#444}
</style>
</head>
<body>
  <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:56px;border-bottom:1px solid #1a1a1a;padding-bottom:40px">
    <div>
      <span class="label">UGC Creator · Los Angeles</span>
      <div class="logo">Javar<br/><em>Brown-Scott</em></div>
    </div>
    <div style="text-align:right;padding-top:12px">
      <p style="color:#C9A84C;font-size:11px;letter-spacing:.2em;text-transform:uppercase">Media Kit 2026</p>
      <p style="margin-top:8px">hello@javarbrownscott.com</p>
      <p>instagram.com/javarscott</p>
    </div>
  </div>

  <div class="section">
    <span class="label">About</span>
    <h2>Content that converts &amp;<br/>culture that connects.</h2>
    <div class="divider"/>
    <p>Los Angeles-based UGC creator specializing in video ads, product demos, and lifestyle content. I create content that doesn't feel like an ad — because the best UGC never does.</p>
    <p>Co-host of <em style="color:#C9A84C99">Smoke &amp; Honesty</em> — a lifestyle &amp; relationship podcast with a growing, engaged audience.</p>
  </div>

  <div class="section">
    <span class="label">By the Numbers</span>
    <div class="grid">
      <div class="stat"><div class="stat-val">10K+</div><div class="stat-lbl">Instagram Followers</div></div>
      <div class="stat"><div class="stat-val">2</div><div class="stat-lbl">Content Verticals</div></div>
      <div class="stat"><div class="stat-val">100%</div><div class="stat-lbl">Authentic Voice</div></div>
    </div>
  </div>

  <div class="section">
    <span class="label">Services</span>
    <div class="service"><strong>Video Ads</strong> — Reels, TikTok, Product Spotlight, Brand Story</div>
    <div class="service"><strong>Product Demos</strong> — Unboxing, Tutorial, Before/After, Review</div>
    <div class="service"><strong>Lifestyle Content</strong> — Day-in-Life, GRWM, Aesthetic Shots, Travel</div>
    <div class="service"><strong>Podcast Integration</strong> — Host Read, Episode Feature, Promo Segment</div>
  </div>

  <div class="section">
    <span class="label">Packages</span>
    <div class="service" style="border-color:#C9A84C33">
      <p style="color:#C9A84C;font-size:11px;letter-spacing:.2em;text-transform:uppercase;margin-bottom:8px">Starter</p>
      <p style="color:#F0EAD6">1 × Short-Form Video (up to 60s) · 1 round of revisions · Usage rights: 30 days</p>
    </div>
    <div class="service">
      <p style="color:#C9A84C;font-size:11px;letter-spacing:.2em;text-transform:uppercase;margin-bottom:8px">Brand Bundle</p>
      <p style="color:#F0EAD6">3 × Videos (mix of formats) · 2 rounds of revisions · Usage rights: 90 days · Story/caption copy included</p>
    </div>
    <div class="service">
      <p style="color:#C9A84C;font-size:11px;letter-spacing:.2em;text-transform:uppercase;margin-bottom:8px">Ongoing Partner</p>
      <p style="color:#F0EAD6">Monthly retainer · 4–8 deliverables/mo · Dedicated turnaround · Full usage rights</p>
    </div>
    <p style="margin-top:16px;font-size:12px">* Custom rates available. All packages negotiable based on scope &amp; brand alignment.</p>
  </div>

  <div class="footer">
    <span>hello@javarbrownscott.com</span>&nbsp;·&nbsp;<span>Los Angeles, CA</span>&nbsp;·&nbsp;<span>Available Remote &amp; On-Site</span>&nbsp;·&nbsp;<span>© 2026 Javar Brown-Scott</span>
  </div>
</body>
</html>`;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "Javar-Brown-Scott-Media-Kit-2026.html";
    a.click(); URL.revokeObjectURL(url);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "'Syne', sans-serif", background: "#080808", color: "#F0EAD6", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Syne:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #080808; }
        ::-webkit-scrollbar-thumb { background: #C9A84C; border-radius: 2px; }
        ::selection { background: #C9A84C33; }
        a { color: inherit; text-decoration: none; }

        .nav-link {
          font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
          color: #888; cursor: pointer; transition: color 0.3s;
          padding: 4px 0; border-bottom: 1px solid transparent;
        }
        .nav-link:hover { color: #C9A84C; border-bottom-color: #C9A84C33; }

        .gold-btn {
          display: inline-block; padding: 14px 36px;
          border: 1px solid #C9A84C; color: #C9A84C;
          font-family: 'Syne', sans-serif; font-size: 11px;
          letter-spacing: 0.25em; text-transform: uppercase;
          cursor: pointer; transition: all 0.35s; background: transparent;
          position: relative; overflow: hidden;
        }
        .gold-btn::before {
          content: ''; position: absolute; inset: 0;
          background: #C9A84C; transform: translateX(-101%);
          transition: transform 0.35s ease;
        }
        .gold-btn:hover::before { transform: translateX(0); }
        .gold-btn span { position: relative; z-index: 1; }
        .gold-btn:hover span { color: #080808; }

        .ghost-btn {
          display: inline-block; padding: 12px 30px;
          border: 1px solid #333; color: #888;
          font-family: 'Syne', sans-serif; font-size: 11px;
          letter-spacing: 0.2em; text-transform: uppercase;
          cursor: pointer; transition: all 0.3s; background: transparent;
        }
        .ghost-btn:hover { border-color: #C9A84C44; color: #C9A84C; }

        .service-card {
          border: 1px solid #1a1a1a; padding: 40px 36px;
          transition: all 0.4s; cursor: default; position: relative;
          overflow: hidden;
        }
        .service-card::before {
          content: ''; position: absolute; bottom: 0; left: 0;
          width: 0; height: 1px; background: #C9A84C;
          transition: width 0.5s ease;
        }
        .service-card:hover { border-color: #2a2a2a; background: #0e0e0e; }
        .service-card:hover::before { width: 100%; }

        .port-card {
          position: relative; overflow: hidden; cursor: pointer;
          transition: transform 0.4s ease;
        }
        .port-card:hover { transform: scale(1.02); }
        .port-card .overlay {
          position: absolute; inset: 0; background: rgba(8,8,8,0.85);
          display: flex; flex-direction: column; justify-content: flex-end;
          padding: 24px; opacity: 0; transition: opacity 0.35s;
        }
        .port-card:hover .overlay { opacity: 1; }

        .tag {
          display: inline-block; padding: 4px 10px;
          border: 1px solid #2a2a2a; font-size: 10px;
          letter-spacing: 0.15em; text-transform: uppercase;
          color: #666; margin: 3px 3px 3px 0;
          transition: all 0.3s;
        }
        .service-card:hover .tag { border-color: #C9A84C33; color: #C9A84C99; }

        .video-card {
          position: relative; overflow: hidden; cursor: pointer;
          background: #0c0c0c; border: 1px solid #1a1a1a;
          transition: border-color 0.3s, transform 0.3s;
        }
        .video-card:hover { border-color: #C9A84C33; transform: translateY(-2px); }
        .video-thumb {
          width: 100%; aspect-ratio: 16/9; position: relative;
          background: #111; overflow: hidden;
        }
        .video-thumb iframe { width: 100%; height: 100%; border: none; display: block; }
        .video-thumb .play-cover {
          position: absolute; inset: 0; background: rgba(8,8,8,0.7);
          display: flex; align-items: center; justify-content: center;
          transition: opacity 0.3s; cursor: pointer;
        }
        .video-thumb .play-cover:hover { background: rgba(8,8,8,0.5); }
        .play-btn-circle {
          width: 56px; height: 56px; border-radius: 50%;
          border: 1.5px solid #C9A84C; display: flex; align-items: center; justify-content: center;
          transition: background 0.3s, transform 0.3s;
        }
        .video-thumb .play-cover:hover .play-btn-circle { background: #C9A84C22; transform: scale(1.08); }
        .filter-pill {
          padding: 8px 20px; border: 1px solid #222; font-size: 10px;
          letter-spacing: 0.2em; text-transform: uppercase; cursor: pointer;
          transition: all 0.3s; background: transparent; font-family: 'Syne', sans-serif;
          color: #555;
        }
        .filter-pill.active { border-color: #C9A84C; color: #C9A84C; background: #C9A84C0d; }
        .filter-pill:hover:not(.active) { border-color: #333; color: #888; }

        .kit-btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 14px 36px; background: #F0EAD6; color: #080808;
          font-family: 'Syne', sans-serif; font-size: 11px;
          letter-spacing: 0.25em; text-transform: uppercase;
          cursor: pointer; transition: all 0.35s; border: 1px solid #F0EAD6;
          position: relative; overflow: hidden;
        }
        .kit-btn::before {
          content: ''; position: absolute; inset: 0;
          background: #C9A84C; transform: translateX(-101%);
          transition: transform 0.35s ease;
        }
        .kit-btn:hover::before { transform: translateX(0); }
        .kit-btn span, .kit-btn svg { position: relative; z-index: 1; }
        .section-label {
          font-size: 10px; letter-spacing: 0.35em; text-transform: uppercase;
          color: #C9A84C; margin-bottom: 16px;
        }

        .stat-item { text-align: center; padding: 32px 20px; border-right: 1px solid #1a1a1a; }
        .stat-item:last-child { border-right: none; }

        .hero-text-main {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(64px, 10vw, 130px);
          line-height: 0.9; font-weight: 300; letter-spacing: -0.02em;
        }
        .hero-text-em {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic; color: #C9A84C;
        }

        .noise-overlay {
          position: fixed; inset: 0; pointer-events: none; z-index: 999;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-anim-1 { animation: fadeUp 0.9s ease 0.1s both; }
        .hero-anim-2 { animation: fadeUp 0.9s ease 0.3s both; }
        .hero-anim-3 { animation: fadeUp 0.9s ease 0.55s both; }
        .hero-anim-4 { animation: fadeUp 0.9s ease 0.75s both; }

        @keyframes lineGrow {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        .line-grow {
          transform-origin: left;
          animation: lineGrow 1.2s ease 0.2s both;
        }

        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .stat-item { border-right: none !important; border-bottom: 1px solid #1a1a1a; }
          .services-grid { grid-template-columns: 1fr !important; }
          .port-grid { grid-template-columns: 1fr 1fr !important; }
          .about-grid { grid-template-columns: 1fr !important; }
          .video-featured-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: scrolled ? "16px 48px" : "28px 48px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(8,8,8,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #1a1a1a" : "1px solid transparent",
        transition: "all 0.4s ease",
      }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 300, letterSpacing: "0.05em" }}>
          J<span style={{ color: "#C9A84C", fontStyle: "italic" }}>.</span>
        </div>
        <div style={{ display: "flex", gap: "36px" }}>
          {SECTIONS.map(s => (
            <span key={s} className="nav-link" onClick={() => scrollTo(s.toLowerCase())}>{s}</span>
          ))}
        </div>
        <button className="gold-btn" onClick={() => scrollTo("contact")} style={{ padding: "10px 24px" }}>
          <span>Let's Work</span>
        </button>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 48px 80px", position: "relative" }}>
        {/* Background accent */}
        <div style={{ position: "absolute", top: "20%", right: "8%", width: "320px", height: "320px", borderRadius: "50%", background: "radial-gradient(circle, #C9A84C08 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "15%", left: "5%", width: "200px", height: "200px", borderRadius: "50%", background: "radial-gradient(circle, #C9A84C05 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: "1100px" }}>
          <div className="hero-anim-1" style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "28px" }}>
            <div style={{ width: "40px", height: "1px", background: "#C9A84C" }} className="line-grow" />
            <span style={{ fontSize: "11px", letterSpacing: "0.35em", textTransform: "uppercase", color: "#C9A84C" }}>UGC Creator · Los Angeles</span>
          </div>

          <div className="hero-text-main hero-anim-2">
            <div>Content that</div>
            <div><span className="hero-text-em">converts</span> &amp;</div>
            <div>culture that</div>
            <div><span className="hero-text-em">connects.</span></div>
          </div>

          <div className="hero-anim-3" style={{ maxWidth: "480px", marginTop: "36px", fontSize: "15px", lineHeight: 1.8, color: "#888" }}>
            Video ads, product demos, and lifestyle content built for brands that want to show up authentically — and actually get results.
          </div>

          <div className="hero-anim-4" style={{ display: "flex", gap: "16px", marginTop: "48px", flexWrap: "wrap" }}>
            <button className="gold-btn" onClick={() => scrollTo("work")}><span>View My Work</span></button>
            <button className="ghost-btn" onClick={() => scrollTo("services")}>What I Offer</button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: "48px", right: "48px", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#444", writingMode: "vertical-rl" }}>Scroll</span>
          <div style={{ width: "1px", height: "48px", background: "linear-gradient(to bottom, #C9A84C, transparent)" }} />
        </div>
      </section>

      {/* STATS BAR */}
      <FadeIn>
        <div style={{ borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a" }}>
          <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", maxWidth: "1100px", margin: "0 auto" }}>
            {stats.map((s, i) => (
              <div key={i} className="stat-item">
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "48px", fontWeight: 300, color: "#C9A84C", lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#555", marginTop: "8px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* WORK */}
      <section id="work" style={{ padding: "120px 48px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <FadeIn>
            <p className="section-label">Portfolio</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px, 5vw, 64px)", fontWeight: 300, lineHeight: 1.1, marginBottom: "16px" }}>
              The work<br /><em style={{ color: "#C9A84C" }}>speaks first.</em>
            </h2>
            <p style={{ fontSize: "14px", color: "#666", maxWidth: "420px", lineHeight: 1.8, marginBottom: "64px" }}>
              A sample of content across verticals. Every piece is crafted to feel native to the platform and true to the brand.
            </p>
          </FadeIn>

          <div className="port-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px" }}>
            {portfolio.map((p, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="port-card" style={{ height: p.aspect === "9:16" ? "400px" : "280px", background: p.bg }}>
                  {/* Simulated content frame */}
                  <div style={{ position: "absolute", inset: "20px", border: `1px solid ${p.accent}22`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ width: "36px", height: "36px", border: `1px solid ${p.accent}44`, borderRadius: "50%", margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ width: "0", height: "0", borderStyle: "solid", borderWidth: "6px 0 6px 10px", borderColor: `transparent transparent transparent ${p.accent}88`, marginLeft: "2px" }} />
                      </div>
                      <div style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: `${p.accent}66` }}>{p.niche}</div>
                    </div>
                  </div>
                  <div className="overlay">
                    <div style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: p.accent, marginBottom: "4px" }}>{p.category}</div>
                    <div style={{ fontSize: "14px", color: "#F0EAD6" }}>{p.niche} · {p.aspect}</div>
                    <div style={{ width: "24px", height: "1px", background: p.accent, marginTop: "12px" }} />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.2}>
            <div style={{ textAlign: "center", marginTop: "56px" }}>
              <p style={{ fontSize: "13px", color: "#555", marginBottom: "20px" }}>Full content library available upon request</p>
              <button className="ghost-btn" onClick={() => scrollTo("contact")}>Request Media Kit</button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* VIDEOS */}
      <section id="videos" style={{ padding: "120px 48px", background: "#060606", borderTop: "1px solid #111" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <FadeIn>
            <p className="section-label">Featured Content</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px, 5vw, 64px)", fontWeight: 300, lineHeight: 1.1, marginBottom: "32px" }}>
              Watch the<br /><em style={{ color: "#C9A84C" }}>work in action.</em>
            </h2>
            {/* Filter pills */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "52px" }}>
              {VIDEO_FILTERS.map(f => (
                <button key={f} className={`filter-pill${activeFilter === f ? " active" : ""}`} onClick={() => setActiveFilter(f)}>{f}</button>
              ))}
            </div>
          </FadeIn>

          {/* Featured large + 2 stacked layout */}
          {(() => {
            const filtered = activeFilter === "All" ? videos : videos.filter(v => v.category === activeFilter);
            const featured = filtered[0];
            const rest = filtered.slice(1, 3);
            return (
              <div>
                {featured && (
                  <FadeIn>
                    <div style={{ display: "grid", gridTemplateColumns: rest.length > 0 ? "1.6fr 1fr" : "1fr", gap: "2px", marginBottom: "2px" }}>
                      <VideoCard v={featured} featured={true} />
                      {rest.length > 0 && (
                        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                          {rest.map((v, i) => <VideoCard key={i} v={v} />)}
                        </div>
                      )}
                    </div>
                  </FadeIn>
                )}

                {filtered.length > 3 && (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px", marginTop: "2px" }}>
                    {filtered.slice(3).map((v, i) => (
                      <FadeIn key={i} delay={i * 0.06}>
                        <VideoCard v={v} />
                      </FadeIn>
                    ))}
                  </div>
                )}

                {filtered.length === 0 && (
                  <div style={{ textAlign: "center", padding: "80px 0", color: "#444", fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", fontStyle: "italic" }}>
                    Content dropping soon.
                  </div>
                )}
              </div>
            );
          })()}

          <FadeIn delay={0.1}>
            <p style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#333", textAlign: "center", marginTop: "40px" }}>
              * Swap YouTube video IDs in the <code style={{ color: "#C9A84C44" }}>videos</code> array with your own content
            </p>
          </FadeIn>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: "120px 48px", background: "#060606", borderTop: "1px solid #111", borderBottom: "1px solid #111" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <FadeIn>
            <p className="section-label">Services</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px, 5vw, 64px)", fontWeight: 300, lineHeight: 1.1, marginBottom: "64px" }}>
              How I can<br /><em style={{ color: "#C9A84C" }}>show up for your brand.</em>
            </h2>
          </FadeIn>

          <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2px" }}>
            {services.map((s, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="service-card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "48px", fontWeight: 300, color: "#C9A84C22", lineHeight: 1 }}>{s.id}</span>
                    <div style={{ width: "20px", height: "1px", background: "#333", marginTop: "16px" }} />
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", fontWeight: 400, marginBottom: "16px" }}>{s.title}</h3>
                  <p style={{ fontSize: "14px", lineHeight: 1.8, color: "#666", marginBottom: "24px" }}>{s.desc}</p>
                  <div>{s.tags.map((t, j) => <span key={j} className="tag">{t}</span>)}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "120px 48px" }}>
        <div className="about-grid" style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
          <FadeIn>
            <div style={{ position: "relative" }}>
              <div style={{ width: "100%", aspectRatio: "3/4", background: "#0e0e0e", border: "1px solid #1a1a1a", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 30%, #C9A84C0a 0%, transparent 60%)" }} />
                <div style={{ position: "absolute", bottom: "24px", left: "24px", right: "24px" }}>
                  <div style={{ width: "32px", height: "1px", background: "#C9A84C", marginBottom: "12px" }} />
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", color: "#C9A84C", fontStyle: "italic" }}>Javar Brown-Scott</div>
                  <div style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#555", marginTop: "6px" }}>UGC Creator · LA</div>
                </div>
              </div>
              {/* Decorative offset border */}
              <div style={{ position: "absolute", top: "20px", left: "20px", right: "-20px", bottom: "-20px", border: "1px solid #1a1a1a", zIndex: -1 }} />
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="section-label">About</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 300, lineHeight: 1.15, marginBottom: "24px" }}>
              Storytelling that<br /><em style={{ color: "#C9A84C" }}>lives in the culture.</em>
            </h2>
            <div className="divider" />
            <p style={{ fontSize: "15px", lineHeight: 2, color: "#777", marginBottom: "20px" }}>
              I'm a Los Angeles-based content creator who sits at the intersection of lifestyle, entertainment, and authentic storytelling. From short-form video ads to full lifestyle integration, I create content that doesn't feel like an ad — because the best UGC never does.
            </p>
            <p style={{ fontSize: "15px", lineHeight: 2, color: "#777", marginBottom: "36px" }}>
              I also co-host <em style={{ color: "#C9A84C99" }}>Smoke & Honesty</em> — a podcast where real conversation meets real reach. If you want your brand in rooms where people actually listen, I'm your person.
            </p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              {["Instagram", "TikTok", "Podcast", "YouTube Shorts"].map((p, i) => (
                <span key={i} className="tag" style={{ color: "#555" }}>{p}</span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section id="contact" style={{ padding: "120px 48px", background: "#060606", borderTop: "1px solid #111", textAlign: "center" }}>
        <FadeIn>
          <p className="section-label" style={{ textAlign: "center" }}>Let's Collaborate</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(48px, 8vw, 100px)", fontWeight: 300, lineHeight: 1, margin: "0 auto 32px" }}>
            Ready when<br /><em style={{ color: "#C9A84C" }}>you are.</em>
          </h2>
          <div className="divider" style={{ margin: "0 auto 32px" }} />
          <p style={{ fontSize: "15px", color: "#666", maxWidth: "440px", margin: "0 auto 48px", lineHeight: 1.8 }}>
            Whether it's a single deliverable or an ongoing partnership, let's build something that actually moves people.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="mailto:hello@javarbrownscott.com" className="gold-btn"><span>📩 Send an Email</span></a>
            <a href="https://www.instagram.com" target="_blank" className="ghost-btn">Instagram DM</a>
            <button className="kit-btn" onClick={handleMediaKitDownload}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              <span>Download Media Kit</span>
            </button>
          </div>
          <p style={{ fontSize: "11px", letterSpacing: "0.15em", color: "#333", marginTop: "64px", textTransform: "uppercase" }}>
            Los Angeles, CA · Available for Remote & On-Site
          </p>
        </FadeIn>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "32px 48px", borderTop: "1px solid #111", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontWeight: 300 }}>
          J<span style={{ color: "#C9A84C", fontStyle: "italic" }}>.</span>
        </div>
        <div style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#444" }}>
          © 2026 Javar Brown-Scott
        </div>
        <div style={{ display: "flex", gap: "24px" }}>
          {SECTIONS.map(s => (
            <span key={s} className="nav-link" style={{ fontSize: "10px" }} onClick={() => scrollTo(s.toLowerCase())}>{s}</span>
          ))}
        </div>
      </footer>
    </div>
  );
}
