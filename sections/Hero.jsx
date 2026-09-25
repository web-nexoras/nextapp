"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, MeshDistortMaterial } from "@react-three/drei";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

/* ---- Animated 3D Sphere ---- */
function ProfileSphere() {
  const meshRef = useRef(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.3;
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.4, 64, 64]} />
        <MeshDistortMaterial
          color="#00d4ff"
          attach="material"
          distort={0.22}
          speed={2}
          roughness={0.1}
          metalness={0.8}
          opacity={0.12}
          transparent
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.0, 0.012, 16, 100]} />
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={1.5} />
      </mesh>
      <mesh rotation={[Math.PI / 3, 0.5, 0]}>
        <torusGeometry args={[2.2, 0.008, 16, 100]} />
        <meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={1.5} />
      </mesh>
    </Float>
  );
}

/* ---- Orbiting particles ---- */
function OrbitParticles() {
  const groupRef = useRef(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 2.8;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * radius, Math.sin(angle * 0.5) * 0.3, Math.sin(angle) * radius]}
          >
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={3} />
          </mesh>
        );
      })}
    </group>
  );
}

/* ---- Typing animation hook ---- */
const roles = [
  "MERN Stack Developer",
  "Full Stack Web Developer",
  "React & Next.js Developer",
  "Node.js & API Developer",
];

function useTyping() {
  const [text, setText] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIdx];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          if (charIdx < current.length) {
            setText(current.slice(0, charIdx + 1));
            setCharIdx((c) => c + 1);
          } else {
            setTimeout(() => setDeleting(true), 1600);
          }
        } else {
          if (charIdx > 0) {
            setText(current.slice(0, charIdx - 1));
            setCharIdx((c) => c - 1);
          } else {
            setDeleting(false);
            setRoleIdx((r) => (r + 1) % roles.length);
          }
        }
      },
      deleting ? 38 : 78,
    );
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, roleIdx]);

  return text;
}

/* ---- Floating badges around profile ---- */
const badges = [
  { label: "React", pos: "top", color: "hsl(var(--primary))", border: "hsl(var(--primary) / 0.4)", anim: "badge-float-1" },
  { label: "Node.js", pos: "right", color: "hsl(var(--secondary))", border: "hsl(var(--secondary) / 0.4)", anim: "badge-float-2" },
  { label: "MongoDB", pos: "bottom", color: "hsl(142 70% 45%)", border: "hsl(142 70% 45% / 0.4)", anim: "badge-float-3" },
  { label: "Next.js", pos: "left", color: "hsl(var(--secondary))", border: "hsl(0 0% 75% / 0.3)", anim: "badge-float-4" },
];

const badgePos = {
  top: { top: "-14px", left: "40%", transform: "translateX(-50%)" },
  right: { top: "50%", right: "-48px", transform: "translateY(-50%)" },
  bottom: { bottom: "-14px", left: "40%", transform: "translateX(-50%)" },
  left: { top: "50%", left: "-48px", transform: "translateY(-50%)" },
};

/* ---- Hero Section ---- */
export default function Hero() {
  const typedText = useTyping();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div
        className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full blur-[130px] opacity-[0.06] pointer-events-none"
        style={{ background: "hsl(var(--primary))" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[110px] opacity-[0.05] pointer-events-none"
        style={{ background: "hsl(var(--secondary))" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Text */}
          <div className="order-1 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono mb-6"
              style={{
                background: "hsl(var(--primary) / 0.08)",
                border: "1px solid hsl(var(--primary) / 0.3)",
                color: "hsl(var(--primary))",
              }}
            >
              <span className="glow-dot" />
              Available for work
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="font-display font-bold leading-tight"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
            >
              <span className="text-foreground">Hi, We&apos;re </span>
              <br />
              <span className="gradient-text">{siteConfig.brand}</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-4 mb-6 font-mono text-xl md:text-2xl font-medium flex items-center gap-1"
              style={{ color: "hsl(var(--primary))" }}
            >
              <span>&gt;&nbsp;</span>
              <span>{typedText}</span>
              <span className="inline-block w-0.5 h-[1.1em] bg-primary animate-[typing-cursor_1s_ease-in-out_infinite] align-middle" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-muted-foreground text-lg leading-relaxed max-w-lg mb-8"
            >
              We build beautiful, high-performance web applications end to end —
              from React/Next.js interfaces to Node.js &amp; MongoDB powered backends.
              Turning complex ideas into clean, interactive products people love.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.72, duration: 0.5 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <a
                href="#projects"
                className="btn-neon px-8 py-3 rounded-xl font-medium text-sm inline-block cursor-pointer"
                style={{ color: "hsl(var(--primary))" }}
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="px-8 py-3 rounded-xl font-medium text-sm inline-block cursor-pointer transition-all hover:scale-105 hover:opacity-90"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
                  color: "hsl(var(--primary-foreground))",
                  boxShadow: "0 4px 24px hsl(var(--primary) / 0.25)",
                }}
              >
                Let&apos;s Talk
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.88, duration: 0.5 }}
              className="flex gap-8"
            >
              {[
                { value: "8+", label: "Projects Built" },
                { value: "1+", label: "Years Coding" },
                { value: "10+", label: "Tech Skills" },
              ].map((stat) => (
                <motion.div key={stat.label} whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 300 }}>
                  <div className="gradient-text font-display font-bold text-2xl">{stat.value}</div>
                  <div className="text-muted-foreground text-xs mt-0.5">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right — Profile + 3D Canvas */}
          <motion.div
            className="order-2 lg:order-2 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative">
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <div
                  className="absolute inset-0 rounded-full animate-[rotate-slow_18s_linear_infinite]"
                  style={{ border: "1px dashed hsl(var(--primary) / 0.25)" }}
                />
                <div
                  className="absolute -inset-8 rounded-full animate-[rotate-slow_30s_linear_infinite_reverse]"
                  style={{ border: "1px dashed hsl(var(--secondary) / 0.18)" }}
                />

                <div
                  className="absolute inset-4 rounded-full overflow-hidden"
                  style={{
                    border: "2px solid hsl(var(--primary) / 0.5)",
                    boxShadow: "0 0 40px hsl(var(--primary) / 0.25), 0 0 80px hsl(var(--primary) / 0.08)",
                  }}
                >
                  <Image
                    src="/assets/profile.jpg"
                    alt={`${siteConfig.brand} — MERN Stack Developer`}
                    fill
                    sizes="320px"
                    priority
                    className="object-cover"
                  />
                </div>

                {badges.map((badge) => (
                  <div
                    key={badge.label}
                    className="absolute px-3 py-1 rounded-full text-xs font-mono font-semibold whitespace-nowrap"
                    style={{
                      ...badgePos[badge.pos],
                      background: "hsl(var(--card))",
                      border: `1px solid ${badge.border}`,
                      color: badge.color,
                      animation: `${badge.anim} 3.5s ease-in-out infinite`,
                      boxShadow: "0 4px 12px hsl(220 30% 10% / 0.12)",
                    }}
                  >
                    {badge.label}
                  </div>
                ))}
              </div>

              <div
                className="absolute -z-10"
                style={{ width: 340, height: 340, left: "50%", top: "50%", transform: "translate(-50%,-50%)" }}
              >
                <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                  <ambientLight intensity={0.3} />
                  <pointLight position={[5, 5, 5]} color="#00d4ff" intensity={1.2} />
                  <pointLight position={[-5, -5, -5]} color="#7c3aed" intensity={0.8} />
                  <Suspense fallback={null}>
                    <Stars radius={80} depth={50} count={800} factor={2} saturation={0} fade speed={1} />
                    <ProfileSphere />
                    <OrbitParticles />
                  </Suspense>
                </Canvas>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-12 left-1/2 translate-x-1/2 flex-col items-center gap-2 hidden lg:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
      >
        <span className="text-muted-foreground text-xs font-mono tracking-wider">scroll</span>
        <motion.div className="w-5 h-8 rounded-full flex justify-center pt-1.5 border border-primary/35">
          <motion.div
            className="w-1 h-2 rounded-full bg-primary"
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
