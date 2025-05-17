"use client";
import { motion } from "framer-motion";

const Orb = ({ delay = 0, size = 8, color = "rgba(56, 189, 248, 0.8)" }) => ( // sky-500
    <motion.div
        style={{
            width: size,
            height: size,
            backgroundColor: color,
            borderRadius: "50%",
            position: "absolute",
            boxShadow: `0 0 ${size * 1.5}px ${size * 0.5}px ${color.replace('0.8', '0.4')}`,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
            scale: [0, 1, 0.8, 1],
            opacity: [0, 1, 0.7, 1],
        }}
        transition={{
            duration: 1.5,
            ease: "easeInOut",
            delay,
            repeat: Infinity,
            repeatType: "mirror",
        }}
    />
);

type OrbitPathProps = {
    radius: number;
    duration: number;
    children: React.ReactNode;
    reverse?: boolean;
};

const OrbitPath = ({ radius, duration, children, reverse = false }: OrbitPathProps) => (
    <motion.div
        style={{
            width: radius * 2,
            height: radius * 2,
            position: "absolute",
            borderRadius: "50%",
            // border: "1px dashed rgba(100, 116, 139, 0.2)", // Optional: visualize orbit path (slate-500)
        }}
        animate={{ rotate: reverse ? -360 : 360 }}
        transition={{
            duration,
            ease: "linear",
            repeat: Infinity,
        }}
    >
        {children}
    </motion.div>
);

const Loader = () => {
    return (
        <div className="flex min-h-screen w-screen items-center justify-center bg-slate-900"> {/* Changed background for better contrast */}
            <div className="relative flex items-center justify-center w-40 h-40 sm:w-48 sm:h-48">
                {/* Central Pulsing Orb */}
                <motion.div
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(56, 189, 248, 1) 0%, rgba(56, 189, 248, 0) 70%)", // sky-500
                        boxShadow: "0 0 30px 10px rgba(56, 189, 248, 0.3)",
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                        duration: 2,
                        ease: "easeInOut",
                        repeat: Infinity,
                    }}
                />

                {/* Orbiting Particles */}
                <OrbitPath radius={60} duration={8}>
                    <div style={{ position: "absolute", top: -4, left: "50%", marginLeft: -4 }}>
                        <Orb size={8} color="rgba(16, 185, 129, 0.8)" /> {/* emerald-500 */}
                    </div>
                </OrbitPath>

                <OrbitPath radius={75} duration={10} reverse={true}>
                    <div style={{ position: "absolute", top: -5, left: "50%", marginLeft: -5 }}>
                        <Orb size={10} color="rgba(168, 85, 247, 0.8)" /> {/* purple-500 */}
                    </div>
                </OrbitPath>

                <OrbitPath radius={90} duration={12}>
                    <div style={{ position: "absolute", top: -3, left: "50%", marginLeft: -3 }}>
                        <Orb size={6} color="rgba(236, 72, 153, 0.8)" /> {/* pink-500 */}
                    </div>
                </OrbitPath>

                {/* Static Outer Rings for depth */}
                <motion.div
                    className="absolute rounded-full border border-sky-500/20"
                    style={{ width: 150, height: 150 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                />
                <motion.div
                    className="absolute rounded-full border-2 border-sky-500/10"
                    style={{ width: 180, height: 180 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                />
            </div>
        </div>
    );
};

export default Loader;
